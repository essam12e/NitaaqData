"use client";

import { Download, MessageCircle, Printer } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui";
import type { Invoice } from "@/types";
import { downloadInvoicePdf } from "@/utils/invoice";
import { whatsappUrl } from "@/utils/whatsapp";

export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  const message = `مرحبا ${invoice.clientName}\nتم إصدار فاتورة ${invoice.invoiceNumber} لاشتراك ${invoice.serviceName} بإجمالي ${invoice.total} ريال.\nشكرا لك.`;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-white/10">
        <BrandLogo href="/invoices" />
        <div className="text-left">
          <p className="text-sm text-slate-500">رقم الفاتورة</p>
          <p className="text-xl font-black">{invoice.invoiceNumber}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Info label="العميل" value={invoice.clientName} />
        <Info label="رقم العميل" value={invoice.clientPhone} />
        <Info label="نوع الاشتراك" value={invoice.subscriptionType} />
        <Info label="الخدمة" value={invoice.serviceName} />
        <Info label="المدة" value={invoice.duration} />
        <Info label="تاريخ البداية" value={invoice.startDate} />
        <Info label="تاريخ النهاية" value={invoice.endDate} />
        <Info label="طريقة الدفع" value={invoice.paymentMethod} />
      </div>
      <div className="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
        <div className="flex justify-between py-2"><span>السعر</span><strong>{invoice.subtotal} ريال</strong></div>
        <div className="flex justify-between py-2"><span>الضريبة</span><strong>{invoice.tax ?? 0} ريال</strong></div>
        <div className="flex justify-between border-t border-slate-200 py-3 text-xl font-black dark:border-white/10"><span>الإجمالي</span><strong>{invoice.total} ريال</strong></div>
      </div>
      <p className="mt-5 text-center font-bold text-cyan-500">شكرا لثقتكم في نطاق|داتا</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => downloadInvoicePdf(invoice)}><Download className="ml-2 h-4 w-4" />تحميل PDF</Button>
        <Button variant="ghost" onClick={() => window.print()}><Printer className="ml-2 h-4 w-4" />طباعة</Button>
        <a className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gradient-to-l from-cyan-400 via-blue-500 to-violet-600 px-5 py-2 text-sm font-black text-white" href={whatsappUrl(invoice.clientPhone, message)} target="_blank" rel="noreferrer">
          <MessageCircle className="ml-2 h-4 w-4" />واتساب
        </a>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="rounded-lg border border-slate-100 p-3 dark:border-white/10">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value || "-"}</p>
    </div>
  );
}
