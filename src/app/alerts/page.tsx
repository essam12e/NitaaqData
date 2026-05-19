"use client";

import { MessageCircle } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { Button, Card } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";
import { clientReminderMessage, whatsappUrl } from "@/utils/whatsapp";

export default function AlertsPage() {
  const workspace = useWorkspace();
  const alerts = workspace.clients.filter((client) => client.status === "expiring" || client.status === "expired");
  return (
    <AppShell title="تنبيهات الانتهاء">
      <Card className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">العملاء الذين يحتاجون تذكيرًا</h2>
            <p className="mt-2 text-slate-500">يمكن إرسال تذكير جماعي بفتح روابط واتساب لكل عميل على حدة.</p>
          </div>
          <Button
            onClick={() => {
              alerts.slice(0, 5).forEach((client) => window.open(whatsappUrl(client.phone, clientReminderMessage(client)), "_blank"));
            }}
          >
            <MessageCircle className="ml-2 h-4 w-4" />تذكير جماعي
          </Button>
        </div>
      </Card>
      <ClientsTable clients={alerts} alertDays={workspace.settings.alertDays} />
    </AppShell>
  );
}

