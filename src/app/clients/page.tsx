"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ButtonLink, Card, Field, inputClass } from "@/components/ui";
import { subscriptionTypes } from "@/lib/constants";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function ClientsPage() {
  const workspace = useWorkspace();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("ending");

  const filtered = useMemo(() => {
    return workspace.clients
      .filter((client) => !client.archived)
      .filter((client) => [client.name, client.phone, client.serviceName].join(" ").toLowerCase().includes(search.toLowerCase()))
      .filter((client) => type === "all" || client.subscriptionType === type)
      .filter((client) => status === "all" || client.status === status)
      .sort((a, b) => (sort === "latest" ? b.addedAt.localeCompare(a.addedAt) : a.endDate.localeCompare(b.endDate)));
  }, [workspace.clients, search, type, status, sort]);

  return (
    <AppShell title="إدارة العملاء">
      <Card className="mb-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          <Field label="بحث">
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-slate-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className={`${inputClass} w-full pr-10`} placeholder="اسم، رقم، خدمة" />
            </div>
          </Field>
          <Field label="نوع الاشتراك">
            <select value={type} onChange={(event) => setType(event.target.value)} className={inputClass}>
              <option value="all">كل الأنواع</option>
              {subscriptionTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="الحالة">
            <select value={status} onChange={(event) => setStatus(event.target.value)} className={inputClass}>
              <option value="all">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="expiring">ينتهي قريبًا</option>
              <option value="expired">منتهي</option>
              <option value="renewed">تم التجديد</option>
            </select>
          </Field>
          <Field label="الترتيب">
            <select value={sort} onChange={(event) => setSort(event.target.value)} className={inputClass}>
              <option value="ending">الأقرب انتهاءً</option>
              <option value="latest">الأحدث</option>
            </select>
          </Field>
          <div className="flex items-end">
            <ButtonLink href="/clients/add" className="w-full gap-2"><Plus className="h-4 w-4" />إضافة عميل</ButtonLink>
          </div>
        </div>
      </Card>
      {filtered.length ? (
        <ClientsTable clients={filtered} alertDays={workspace.settings.alertDays} onArchive={workspace.archiveClient} />
      ) : (
        <Card className="text-center">
          <p className="text-xl font-black">لا توجد نتائج</p>
          <p className="mt-2 text-slate-500">غيّر الفلاتر أو أضف عميلًا جديدًا.</p>
        </Card>
      )}
    </AppShell>
  );
}

