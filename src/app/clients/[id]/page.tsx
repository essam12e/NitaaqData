"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { StatusBadge } from "@/components/clients/StatusBadge";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";
import { Button, ButtonLink, Card, Field, inputClass } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";
import type { SubscriptionDuration } from "@/types";
import { createInvoiceFromClient } from "@/utils/invoice";

export default function ClientDetailsPage() {
  const params = useParams<{ id: string }>();
  const workspace = useWorkspace();
  const client = workspace.clients.find((item) => item.id === params.id);

  if (!client) {
    return (
      <AppShell title="تفاصيل العميل">
        <Card className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-black">لم يتم العثور على العميل</h2>
          <p className="mt-2 text-slate-500">لا توجد بيانات محفوظة لهذا العميل في الجلسة الحالية.</p>
          <ButtonLink href="/clients" className="mt-5">العودة للعملاء</ButtonLink>
        </Card>
      </AppShell>
    );
  }

  const clientRenewals = workspace.renewals.filter((item) => item.clientId === client.id);
  const clientInvoices = workspace.invoices.filter((item) => item.clientId === client.id);
  const invoice =
    clientInvoices[0] ??
    createInvoiceFromClient({
      clientId: client.id,
      clientName: client.name,
      clientPhone: client.phone,
      clientEmail: client.email,
      subscriptionType: client.subscriptionType,
      serviceName: client.serviceName,
      duration: client.duration,
      startDate: client.startDate,
      endDate: client.endDate,
      subtotal: client.price,
      tax: 0,
      total: client.price,
      paymentMethod: client.paymentMethod,
      notes: client.notes,
      createdBy: workspace.user.name,
    });

  return (
    <AppShell title="تفاصيل العميل">
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="grid min-w-0 gap-5">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-black">{client.name}</h2>
                <p className="text-slate-500" dir="ltr">{client.phone}</p>
              </div>
              <StatusBadge client={client} alertDays={workspace.settings.alertDays} />
            </div>
            <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
              <Info label="البريد" value={client.email || "اختياري"} />
              <Info label="نوع الاشتراك" value={client.customSubscriptionType || client.subscriptionType} />
              <Info label="الخدمة" value={client.serviceName} />
              <Info label="المدة" value={client.duration} />
              <Info label="البداية" value={client.startDate} />
              <Info label="النهاية" value={client.endDate} />
              <Info label="السعر" value={`${client.price} ريال`} />
              <Info label="الموظف" value={client.addedByName} />
            </div>
          </Card>

          <Card id="renew" className="overflow-hidden">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-black">
              <RefreshCw className="h-5 w-5 text-cyan-500" />
              تجديد الاشتراك
            </h3>
            <form
              className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                workspace.renewClient(client.id, String(form.get("duration")) as SubscriptionDuration, Number(form.get("price")), String(form.get("notes") ?? ""));
                alert("تم حفظ التجديد في السجل.");
              }}
            >
              <Field label="المدة">
                <select name="duration" className={inputClass}>
                  <option value="month">شهر</option>
                  <option value="quarter">3 أشهر</option>
                  <option value="halfYear">6 أشهر</option>
                  <option value="year">سنة</option>
                </select>
              </Field>
              <Field label="السعر">
                <input name="price" type="number" defaultValue={client.price} className={inputClass} />
              </Field>
              <Field label="ملاحظات">
                <input name="notes" className={inputClass} />
              </Field>
              <div className="sm:col-span-2 xl:col-span-3">
                <Button type="submit" className="w-full sm:w-auto">حفظ التجديد</Button>
              </div>
            </form>
          </Card>

          <Card>
            <h3 className="mb-3 text-xl font-black">سجل التجديدات</h3>
            <div className="grid gap-2">
              {clientRenewals.map((renewal) => (
                <div key={renewal.id} className="rounded-lg bg-gradient-to-l from-cyan-50 to-blue-50 p-3 dark:from-cyan-400/10 dark:to-blue-400/10">
                  {renewal.serviceName} من {renewal.startDate} إلى {renewal.endDate} - {renewal.price} ريال
                </div>
              ))}
              {!clientRenewals.length && <p className="text-slate-500">لا توجد تجديدات محفوظة بعد.</p>}
            </div>
          </Card>
        </div>

        <div className="min-w-0">
          <InvoicePreview invoice={invoice} />
          <Link className="mt-4 inline-block text-sm font-black text-cyan-500" href="/invoices">عرض كل الفواتير</Link>
        </div>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0 rounded-lg bg-gradient-to-l from-cyan-50 to-blue-50 p-3 dark:from-cyan-400/10 dark:to-blue-400/10">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 break-words font-black">{value}</p>
    </div>
  );
}

