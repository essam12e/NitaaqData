"use client";

import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function RenewalsPage() {
  const workspace = useWorkspace();
  return (
    <AppShell title="التجديدات">
      <div className="grid gap-4">
        {workspace.renewals.map((renewal) => (
          <Card key={renewal.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">{renewal.clientName}</h2>
                <p className="text-slate-500">{renewal.serviceName} - {renewal.subscriptionType}</p>
              </div>
              <strong className="text-cyan-500">{renewal.price} ريال</strong>
            </div>
            <p className="mt-3">من {renewal.startDate} إلى {renewal.endDate} بواسطة {renewal.renewedBy}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

