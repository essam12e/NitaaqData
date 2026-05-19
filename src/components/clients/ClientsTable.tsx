"use client";

import Link from "next/link";
import { Copy, FileText, MessageCircle, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { StatusBadge } from "@/components/clients/StatusBadge";
import type { Client } from "@/types";
import { clientReminderMessage, copyToClipboard, whatsappUrl } from "@/utils/whatsapp";

export function ClientsTable({ clients, alertDays, onArchive }: { clients: Client[]; alertDays: number; onArchive?: (id: string) => void }) {
  if (!clients.length) {
    return (
      <div className="animate-rise rounded-lg border border-dashed border-cyan-200 bg-white p-10 text-center shadow-sm dark:border-cyan-300/20 dark:bg-slate-900">
        <p className="text-2xl font-black text-slate-950 dark:text-white">لا توجد بيانات بعد</p>
        <p className="mt-2 text-slate-500">ابدأ بإضافة عميل جديد لتظهر البيانات هنا بشكل منظم.</p>
      </div>
    );
  }

  return (
    <div className="animate-rise overflow-hidden rounded-lg border border-cyan-100 bg-white shadow-sm dark:border-cyan-300/10 dark:bg-slate-900">
      <div className="grid gap-3 p-3 xl:hidden">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} alertDays={alertDays} onArchive={onArchive} />
        ))}
      </div>
      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full min-w-[1220px] table-fixed text-right text-sm">
          <colgroup>
            <col className="w-[190px]" />
            <col className="w-[150px]" />
            <col className="w-[165px]" />
            <col className="w-[160px]" />
            <col className="w-[125px]" />
            <col className="w-[105px]" />
            <col className="w-[150px]" />
            <col className="w-[135px]" />
            <col className="w-[240px]" />
          </colgroup>
          <thead className="bg-gradient-to-l from-cyan-50 via-blue-50 to-violet-50 text-xs font-black text-slate-700 dark:from-cyan-400/10 dark:via-blue-400/10 dark:to-violet-400/10 dark:text-slate-200">
            <tr>
              {["العميل", "الجوال", "النوع", "الخدمة", "النهاية", "السعر", "الحالة", "الموظف", "الإجراءات"].map((heading) => (
                <th key={heading} className="px-5 py-4">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-50 dark:divide-white/10">
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} alertDays={alertDays} onArchive={onArchive} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientRow({ client, alertDays, onArchive }: { client: Client; alertDays: number; onArchive?: (id: string) => void }) {
  return (
    <tr className="transition hover:bg-cyan-50/40 dark:hover:bg-white/5">
      <td className="px-5 py-5 align-middle">
        <ClientName client={client} />
      </td>
      <td className="px-5 py-5 align-middle text-slate-700 dark:text-slate-200" dir="ltr">{client.phone}</td>
      <td className="px-5 py-5 align-middle leading-7">{client.customSubscriptionType || client.subscriptionType}</td>
      <td className="px-5 py-5 align-middle leading-7">{client.serviceName}</td>
      <td className="px-5 py-5 align-middle" dir="ltr">{client.endDate}</td>
      <td className="px-5 py-5 align-middle">{client.price} ريال</td>
      <td className="px-5 py-5 align-middle"><StatusBadge client={client} alertDays={alertDays} /></td>
      <td className="px-5 py-5 align-middle leading-7">{client.addedByName}</td>
      <td className="px-5 py-5 align-middle">
        <ActionButtons client={client} onArchive={onArchive} />
      </td>
    </tr>
  );
}

function ClientCard({ client, alertDays, onArchive }: { client: Client; alertDays: number; onArchive?: (id: string) => void }) {
  return (
    <div className="rounded-lg border border-cyan-100 p-4 dark:border-cyan-300/10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <ClientName client={client} />
        <StatusBadge client={client} alertDays={alertDays} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Info label="الجوال" value={client.phone} ltr />
        <Info label="النوع" value={client.customSubscriptionType || client.subscriptionType} />
        <Info label="الخدمة" value={client.serviceName} />
        <Info label="النهاية" value={client.endDate} ltr />
        <Info label="السعر" value={`${client.price} ريال`} />
        <Info label="الموظف" value={client.addedByName} />
      </div>
      <div className="mt-4">
        <ActionButtons client={client} onArchive={onArchive} />
      </div>
    </div>
  );
}

function ClientName({ client }: { client: Client }) {
  return (
    <div className="min-w-0">
      <Link className="block truncate text-base font-black text-slate-950 dark:text-white" href={`/clients/${client.id}`}>
        {client.name}
      </Link>
      {client.tier === "vip" && (
        <span className="mt-2 inline-flex rounded-full bg-gradient-to-l from-cyan-100 to-violet-100 px-2 py-1 text-xs font-black text-violet-700">
          VIP
        </span>
      )}
    </div>
  );
}

function Info({ label, value, ltr }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="rounded-lg bg-gradient-to-l from-cyan-50 to-blue-50 p-3 dark:from-cyan-400/10 dark:to-blue-400/10">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 break-words font-black" dir={ltr ? "ltr" : "rtl"}>{value}</p>
    </div>
  );
}

function ActionButtons({ client, onArchive }: { client: Client; onArchive?: (id: string) => void }) {
  const message = clientReminderMessage(client);
  const iconClass = "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-100 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-blue-600 dark:border-cyan-300/10 dark:bg-slate-950 dark:text-slate-200";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-l from-cyan-400 via-blue-500 to-violet-600 text-white transition hover:-translate-y-0.5" href={whatsappUrl(client.phone, message)} target="_blank" rel="noreferrer" aria-label="واتساب">
        <MessageCircle className="h-4 w-4" />
      </a>
      <button className={iconClass} onClick={() => copyToClipboard(message)} aria-label="نسخ رسالة واتساب">
        <Copy className="h-4 w-4" />
      </button>
      <Link className={iconClass} href={`/clients/${client.id}`} aria-label="فاتورة">
        <FileText className="h-4 w-4" />
      </Link>
      <Link className={iconClass} href={`/clients/${client.id}#renew`} aria-label="تجديد">
        <RefreshCw className="h-4 w-4" />
      </Link>
      {onArchive && (
        <Button variant="danger" className="h-10 min-h-0 w-10 px-0 py-0" onClick={() => confirm("هل تريد أرشفة العميل؟") && onArchive(client.id)} aria-label="أرشفة">
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

