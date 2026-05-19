"use client";

import { AppShell } from "@/components/app/AppShell";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { Card } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function SubscriptionsPage() {
  const workspace = useWorkspace();
  return (
    <AppShell title="الاشتراكات">
      <Card className="mb-5">
        <h2 className="text-xl font-black">كل الاشتراكات الحالية</h2>
        <p className="mt-2 text-slate-500">الحالة تحسب تلقائيًا حسب تاريخ النهاية وعدد أيام التنبيه.</p>
      </Card>
      <ClientsTable clients={workspace.clients} alertDays={workspace.settings.alertDays} />
    </AppShell>
  );
}

