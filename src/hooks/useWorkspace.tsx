"use client";

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultSettings } from "@/lib/constants";
import { auth, isFirebaseConfigured } from "@/services/firebase";
import { listClients, listInvoices, listRenewals, saveClient, saveInvoice, saveRenewal, saveUserProfile } from "@/services/firestore";
import type { AppUser, BusinessSettings, Client, Invoice, Renewal, SubscriptionDuration } from "@/types";
import { calculateEndDate, enrichClientStatus, todayISO } from "@/utils/dates";

export const currentUser: AppUser = {
  id: "u-admin",
  name: "المدير الرئيسي",
  email: "admin@nitaaq-data.sa",
  role: "admin",
  active: true,
  organizationId: "demo-org",
};

interface WorkspaceValue {
  user: AppUser;
  clients: Client[];
  invoices: Invoice[];
  renewals: Renewal[];
  settings: BusinessSettings;
  stats: {
    totalClients: number;
    active: number;
    expired: number;
    expiring: number;
    totalRevenue: number;
    salesThisMonth: number;
    newThisMonth: number;
    topType: string;
  };
  addClient: (client: Omit<Client, "id" | "organizationId" | "status" | "addedAt" | "addedBy" | "addedByName">) => Client;
  addInvoice: (invoice: Invoice) => void;
  renewClient: (clientId: string, duration: SubscriptionDuration, price: number, notes?: string) => Renewal | null;
  archiveClient: (clientId: string) => void;
  setSettings: (settings: BusinessSettings) => void;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(defaultSettings);
  const [user, setUser] = useState<AppUser>(currentUser);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!auth || !isFirebaseConfigured) {
      queueMicrotask(() => {
        const saved = readLocalWorkspace(currentUser.email);
        if (saved) {
          setClients(saved.clients);
          setInvoices(saved.invoices);
          setRenewals(saved.renewals);
        }
        setHydrated(true);
      });
      return undefined;
    }

    return onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser?.email) return;

      const nextUser: AppUser = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
        email: firebaseUser.email,
        role: "admin",
        active: true,
        organizationId: firebaseUser.uid,
      };

      setUser(nextUser);
      saveUserProfile(nextUser).catch(console.error);

      void loadRemoteWorkspace(nextUser.organizationId, nextUser.email).then((workspace) => {
        setClients(workspace.clients);
        setInvoices(workspace.invoices);
        setRenewals(workspace.renewals);
        setHydrated(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeLocalWorkspace(user.email, { clients, invoices, renewals });
  }, [clients, hydrated, invoices, renewals, user.email]);

  const computedClients = useMemo(
    () => clients.map((client) => enrichClientStatus(client, settings.alertDays)),
    [clients, settings.alertDays],
  );

  const stats = useMemo(() => {
    const active = computedClients.filter((client) => client.status === "active" || client.status === "renewed");
    const expired = computedClients.filter((client) => client.status === "expired");
    const expiring = computedClients.filter((client) => client.status === "expiring");
    const monthPrefix = todayISO().slice(0, 7);
    const salesThisMonth = invoices
      .filter((invoice) => invoice.createdAt.startsWith(monthPrefix))
      .reduce((sum, invoice) => sum + invoice.total, 0);
    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const newThisMonth = computedClients.filter((client) => client.addedAt.startsWith(monthPrefix)).length;
    const topType =
      Object.entries(
        computedClients.reduce<Record<string, number>>((acc, client) => {
          acc[client.subscriptionType] = (acc[client.subscriptionType] ?? 0) + 1;
          return acc;
        }, {}),
      ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "لا يوجد";

    return {
      totalClients: computedClients.length,
      active: active.length,
      expired: expired.length,
      expiring: expiring.length,
      totalRevenue,
      salesThisMonth,
      newThisMonth,
      topType,
    };
  }, [computedClients, invoices]);

  function addClient(client: Omit<Client, "id" | "organizationId" | "status" | "addedAt" | "addedBy" | "addedByName">) {
    const nextClient: Client = {
      ...client,
      id: `c-${Date.now()}`,
      organizationId: user.organizationId,
      status: "active",
      addedAt: todayISO(),
      addedBy: user.id,
      addedByName: user.name,
    };
    setClients((items) => [nextClient, ...items]);
    saveClient(nextClient).catch(console.error);
    return nextClient;
  }

  function renewClient(clientId: string, duration: SubscriptionDuration, price: number, notes?: string) {
    const target = computedClients.find((client) => client.id === clientId);
    if (!target) return null;
    const startDate = todayISO();
    const endDate = calculateEndDate(startDate, duration);
    const renewal: Renewal = {
      id: `r-${Date.now()}`,
      organizationId: user.organizationId,
      clientId,
      clientName: target.name,
      subscriptionType: target.subscriptionType,
      serviceName: target.serviceName,
      duration,
      startDate,
      endDate,
      price,
      notes,
      renewedBy: user.name,
      renewedAt: todayISO(),
    };
    setRenewals((items) => [renewal, ...items]);
    saveRenewal(renewal).catch(console.error);
    setClients((items) =>
      items.map((client) =>
        client.id === clientId ? { ...client, duration, price, startDate, endDate, status: "renewed", renewedAt: todayISO() } : client,
      ),
    );
    return renewal;
  }

  function addInvoice(invoice: Invoice) {
    const nextInvoice = { ...invoice, organizationId: user.organizationId };
    setInvoices((items) => [nextInvoice, ...items]);
    saveInvoice(nextInvoice).catch(console.error);
  }

  function archiveClient(clientId: string) {
    setClients((items) => items.map((client) => (client.id === clientId ? { ...client, archived: true } : client)));
  }

  const value: WorkspaceValue = {
    user,
    clients: computedClients,
    invoices,
    renewals,
    settings,
    stats,
    addClient,
    addInvoice,
    renewClient,
    archiveClient,
    setSettings,
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

async function loadRemoteWorkspace(organizationId: string, email: string) {
  try {
    const [clients, invoices, renewals] = await Promise.all([
      listClients(organizationId),
      listInvoices(organizationId),
      listRenewals(organizationId),
    ]);
    const workspace = { clients, invoices, renewals };
    writeLocalWorkspace(email, workspace);
    return workspace;
  } catch (error) {
    console.error(error);
    return readLocalWorkspace(email) ?? { clients: [], invoices: [], renewals: [] };
  }
}

function readLocalWorkspace(email: string) {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(storageKey(email));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { clients: Client[]; invoices: Invoice[]; renewals: Renewal[] };
  } catch {
    return null;
  }
}

function writeLocalWorkspace(email: string, workspace: { clients: Client[]; invoices: Invoice[]; renewals: Renewal[] }) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(email), JSON.stringify(workspace));
}

function storageKey(email: string) {
  return `nitaaq-data:${email.toLowerCase()}`;
}

export function useWorkspace() {
  const workspace = useContext(WorkspaceContext);
  if (!workspace) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return workspace;
}
