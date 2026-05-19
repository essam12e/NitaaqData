"use client";

import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/services/firebase";
import type { ActivityLog, AppUser, BusinessSettings, Client, Invoice, Renewal } from "@/types";

function requireDb() {
  if (!db || !isFirebaseConfigured) throw new Error("Firestore غير مهيأ. استخدم ملف .env.local.");
  return db;
}

export async function listClients(organizationId: string) {
  const snapshot = await getDocs(query(collection(requireDb(), "clients"), where("organizationId", "==", organizationId)));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Client);
}

export async function listInvoices(organizationId: string) {
  const snapshot = await getDocs(query(collection(requireDb(), "invoices"), where("organizationId", "==", organizationId)));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Invoice);
}

export async function listRenewals(organizationId: string) {
  const snapshot = await getDocs(query(collection(requireDb(), "renewals"), where("organizationId", "==", organizationId)));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Renewal);
}

export async function saveClient(client: Client) {
  await setDoc(doc(requireDb(), "clients", client.id), client, { merge: true });
}

export async function removeClient(clientId: string) {
  await deleteDoc(doc(requireDb(), "clients", clientId));
}

export async function saveInvoice(invoice: Invoice) {
  await setDoc(doc(requireDb(), "invoices", invoice.id), invoice, { merge: true });
}

export async function saveRenewal(renewal: Renewal) {
  await setDoc(doc(requireDb(), "renewals", renewal.id), renewal, { merge: true });
}

export async function updateSettings(organizationId: string, settings: BusinessSettings) {
  await setDoc(doc(requireDb(), "settings", organizationId), settings, { merge: true });
}

export async function writeActivityLog(log: Omit<ActivityLog, "id">) {
  await addDoc(collection(requireDb(), "activityLogs"), log);
}

export async function setUserRole(userId: string, role: string, active: boolean) {
  await updateDoc(doc(requireDb(), "users", userId), { role, active });
}

export async function saveUserProfile(user: AppUser) {
  await setDoc(doc(requireDb(), "users", user.id), user, { merge: true });
}
