"use client";

import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function InvoicesPage() {
  const workspace = useWorkspace();

  return (
    <AppShell title="الفواتير">
      {workspace.invoices.length ? (
        <div className="grid min-w-0 gap-5 xl:grid-cols-2">
          {workspace.invoices.map((invoice) => (
            <InvoicePreview key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        <Card className="text-center">
          <h2 className="text-2xl font-black">لا توجد فواتير بعد</h2>
          <p className="mt-2 text-slate-500">أنشئ فاتورة من صفحة تفاصيل العميل بعد إضافة أول عميل.</p>
        </Card>
      )}
    </AppShell>
  );
}

