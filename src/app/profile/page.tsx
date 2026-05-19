"use client";

import { AppShell } from "@/components/app/AppShell";
import { Card } from "@/components/ui";
import { currentUser } from "@/hooks/useWorkspace";

export default function ProfilePage() {
  return (
    <AppShell title="الملف الشخصي">
      <Card>
        <h2 className="text-2xl font-black">{currentUser.name}</h2>
        <p className="mt-2 text-slate-500">{currentUser.email}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">الدور</p><strong>{currentUser.role}</strong></div>
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">المؤسسة</p><strong>{currentUser.organizationId}</strong></div>
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">الحالة</p><strong>مفعل</strong></div>
        </div>
      </Card>
    </AppShell>
  );
}

