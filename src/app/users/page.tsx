"use client";

import { AppShell } from "@/components/app/AppShell";
import { Button, Card, Field, inputClass } from "@/components/ui";

export default function UsersPage() {
  return (
    <AppShell title="المستخدمون والصلاحيات">
      <div className="grid min-w-0 gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h2 className="mb-4 text-xl font-black">إضافة مستخدم</h2>
          <form className="grid min-w-0 gap-4">
            <Field label="الاسم">
              <input className={inputClass} />
            </Field>
            <Field label="البريد">
              <input type="email" className={inputClass} />
            </Field>
            <Field label="الدور">
              <select className={inputClass}>
                <option>Admin</option>
                <option>Manager</option>
                <option>Employee</option>
              </select>
            </Field>
            <Button type="button">إضافة المستخدم</Button>
          </form>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-black">الصلاحيات</h2>
          <div className="rounded-lg border border-dashed border-cyan-200 p-8 text-center dark:border-cyan-300/20">
            <p className="text-xl font-black">لا يوجد مستخدمون مضافون بعد</p>
            <p className="mt-2 text-slate-500">أضف موظفًا وحدد الدور المناسب لتظهر قائمة الصلاحيات هنا.</p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

