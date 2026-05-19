"use client";

import { AppShell } from "@/components/app/AppShell";
import { Button, Card, Field, inputClass } from "@/components/ui";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function SettingsPage() {
  const workspace = useWorkspace();
  const settings = workspace.settings;
  return (
    <AppShell title="الإعدادات">
      <Card>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            alert("تم حفظ الإعدادات محليًا. عند ربط Firebase استخدم updateSettings.");
          }}
        >
          <Field label="اسم المتجر أو الشركة"><input defaultValue={settings.businessName} className={inputClass} /></Field>
          <Field label="رقم واتساب"><input defaultValue={settings.whatsapp} className={inputClass} dir="ltr" /></Field>
          <Field label="البريد الإلكتروني"><input defaultValue={settings.email} type="email" className={inputClass} /></Field>
          <Field label="الشعار"><input type="file" accept="image/*" className={inputClass} /></Field>
          <Field label="العملة"><input readOnly value="ريال سعودي" className={inputClass} /></Field>
          <Field label="أيام التنبيه قبل الانتهاء"><input type="number" defaultValue={settings.alertDays} min={1} className={inputClass} /></Field>
          <Field label="الضريبة"><select defaultValue={settings.invoiceTaxEnabled ? "yes" : "no"} className={inputClass}><option value="no">اختيارية / غير مفعلة</option><option value="yes">مفعلة</option></select></Field>
          <Field label="نسبة الضريبة"><input type="number" defaultValue={settings.invoiceTaxRate} className={inputClass} /></Field>
          <Field label="عبارة الشكر"><input defaultValue={settings.invoiceThanks} className={inputClass} /></Field>
          <div className="md:col-span-2">
            <Field label="قالب رسالة واتساب"><textarea defaultValue={settings.messageTemplate} className={inputClass} rows={4} /></Field>
          </div>
          <div className="md:col-span-2"><Button type="submit">حفظ الإعدادات</Button></div>
        </form>
      </Card>
    </AppShell>
  );
}
