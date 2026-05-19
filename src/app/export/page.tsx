"use client";

import { Download } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Button, Card } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";
import { exportWorkspaceToExcel } from "@/utils/export";

export default function ExportPage() {
  const workspace = useWorkspace();

  return (
    <AppShell title="تصدير البيانات">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <h2 className="text-xl font-black">تحميل ملف Excel</h2>
          <p className="mt-2 max-w-2xl leading-8 text-slate-500">
            يتم تصدير العملاء والاشتراكات والفواتير والتجديدات والحالات والتواريخ والأسعار والموظف المسؤول في ملف واحد منظم.
          </p>
          <Button className="mt-5" onClick={() => exportWorkspaceToExcel(workspace.clients, workspace.invoices, workspace.renewals)}>
            <Download className="ml-2 h-4 w-4" />
            تصدير Excel
          </Button>
        </Card>
        <Card className="bg-gradient-to-l from-cyan-50 via-blue-50 to-violet-50 dark:from-cyan-400/10 dark:via-blue-400/10 dark:to-violet-400/10">
          <h2 className="text-xl font-black">ملف نظيف وجاهز</h2>
          <p className="mt-2 leading-8 text-slate-600 dark:text-slate-300">
            لا يتم إرسال أي بيانات عبر البريد من داخل النظام. التصدير يتم محليًا بتحميل مباشر للملف.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}

