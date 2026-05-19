"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { ClientForm } from "@/components/clients/ClientForm";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function AddClientPage() {
  const workspace = useWorkspace();
  const router = useRouter();
  return (
    <AppShell title="إضافة عميل جديد">
      <ClientForm
        onSubmit={(client) => {
          const saved = workspace.addClient(client);
          router.push(`/clients/${saved.id}`);
        }}
      />
    </AppShell>
  );
}

