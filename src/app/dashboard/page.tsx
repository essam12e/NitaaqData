"use client";

import { AlertTriangle, CalendarClock, CircleDollarSign, TrendingUp, UserPlus, Users } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { ChartsPanel } from "@/components/app/ChartsPanel";
import { StatsCard } from "@/components/app/StatsCard";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { Card } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function DashboardPage() {
  const workspace = useWorkspace();
  const latest = workspace.clients.slice(0, 5);
  const alerts = workspace.clients.filter((client) => client.status === "expiring" || client.status === "expired").slice(0, 4);

  return (
    <AppShell title="لوحة التحكم">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="عدد العملاء" value={workspace.stats.totalClients} icon={Users} tone="bg-cyan-100 text-cyan-600" />
        <StatsCard title="اشتراكات نشطة" value={workspace.stats.active} icon={CalendarClock} tone="bg-blue-100 text-blue-600" />
        <StatsCard title="اشتراكات منتهية" value={workspace.stats.expired} icon={AlertTriangle} tone="bg-violet-100 text-violet-600" />
        <StatsCard title="تنتهي خلال 5 أيام" value={workspace.stats.expiring} icon={TrendingUp} tone="bg-sky-100 text-sky-600" />
        <StatsCard title="إجمالي المبالغ" value={`${workspace.stats.totalRevenue} ريال`} icon={CircleDollarSign} tone="bg-violet-100 text-violet-600" />
        <StatsCard title="مبيعات الشهر الحالي" value={`${workspace.stats.salesThisMonth} ريال`} icon={CircleDollarSign} tone="bg-blue-100 text-blue-600" />
        <StatsCard title="عملاء جدد هذا الشهر" value={workspace.stats.newThisMonth} icon={UserPlus} tone="bg-cyan-100 text-cyan-600" />
        <StatsCard title="الأكثر مبيعًا" value={workspace.stats.topType} icon={TrendingUp} tone="bg-gradient-to-l from-cyan-100 to-violet-100 text-blue-700" />
      </div>
      <div className="mt-6">
        <ChartsPanel clients={workspace.clients} invoices={workspace.invoices} />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.7fr]">
        <div>
          <h2 className="mb-3 text-xl font-black">آخر العملاء المضافين</h2>
          <ClientsTable clients={latest} alertDays={workspace.settings.alertDays} />
        </div>
        <Card>
          <h2 className="mb-4 text-xl font-black">تنبيهات سريعة</h2>
          <div className="grid gap-3">
            {alerts.map((client) => (
              <div key={client.id} className="rounded-lg border border-cyan-100 bg-gradient-to-l from-cyan-50 to-violet-50 p-3 text-blue-900 dark:border-cyan-300/20 dark:from-cyan-400/10 dark:to-violet-400/10 dark:text-cyan-100">
                <p className="font-black">{client.name}</p>
                <p className="text-sm">اشتراك {client.serviceName} يحتاج متابعة.</p>
              </div>
            ))}
            {!alerts.length && <p className="rounded-lg bg-gradient-to-l from-cyan-50 to-blue-50 p-4 text-blue-700">لا توجد تنبيهات عاجلة.</p>}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
