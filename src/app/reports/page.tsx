"use client";

import { CalendarDays } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { ChartsPanel } from "@/components/app/ChartsPanel";
import { StatsCard } from "@/components/app/StatsCard";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function ReportsPage() {
  const workspace = useWorkspace();
  return (
    <AppShell title="التقارير">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="إجمالي المبيعات" value={`${workspace.stats.totalRevenue} ريال`} icon={CalendarDays} tone="bg-cyan-100 text-cyan-600" />
        <StatsCard title="العملاء الجدد" value={workspace.stats.newThisMonth} icon={CalendarDays} tone="bg-blue-100 text-blue-600" />
        <StatsCard title="الاشتراكات المنتهية" value={workspace.stats.expired} icon={CalendarDays} tone="bg-violet-100 text-violet-600" />
        <StatsCard title="الاشتراكات النشطة" value={workspace.stats.active} icon={CalendarDays} tone="bg-blue-100 text-blue-600" />
      </div>
      <div className="mt-6">
        <ChartsPanel clients={workspace.clients} invoices={workspace.invoices} />
      </div>
    </AppShell>
  );
}
