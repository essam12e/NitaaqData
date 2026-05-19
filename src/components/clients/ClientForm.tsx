"use client";

import { useMemo, useState } from "react";
import { Button, Card, Field, inputClass } from "@/components/ui";
import { subscriptionTypes } from "@/lib/constants";
import type { Client, PaymentMethod, SubscriptionDuration } from "@/types";
import { calculateEndDate, todayISO } from "@/utils/dates";

interface ClientFormProps {
  onSubmit: (client: Omit<Client, "id" | "organizationId" | "status" | "addedAt" | "addedBy" | "addedByName">) => void;
}

export function ClientForm({ onSubmit }: ClientFormProps) {
  const [duration, setDuration] = useState<SubscriptionDuration>("month");
  const [startDate, setStartDate] = useState(todayISO());
  const [customDays, setCustomDays] = useState(10);
  const endDate = useMemo(() => calculateEndDate(startDate, duration, customDays), [startDate, duration, customDays]);

  return (
    <Card>
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          onSubmit({
            name: String(form.get("name")),
            phone: String(form.get("phone")),
            email: String(form.get("email") ?? ""),
            subscriptionType: String(form.get("subscriptionType")),
            customSubscriptionType: String(form.get("customSubscriptionType") ?? ""),
            serviceName: String(form.get("serviceName")),
            duration,
            customDays: duration === "custom" ? customDays : undefined,
            startDate,
            endDate,
            price: Number(form.get("price")),
            paymentMethod: String(form.get("paymentMethod")) as PaymentMethod,
            notes: String(form.get("notes") ?? ""),
            internalNotes: String(form.get("internalNotes") ?? ""),
            tier: String(form.get("tier")) as "vip" | "normal",
          });
        }}
      >
        <Field label="اسم العميل">
          <input required name="name" className={inputClass} placeholder="مثال: محمد أحمد" />
        </Field>
        <Field label="رقم الجوال">
          <input required name="phone" className={inputClass} placeholder="+9665xxxxxxxx" pattern="^\\+?[0-9]{9,15}$" />
        </Field>
        <Field label="البريد الإلكتروني">
          <input name="email" type="email" className={inputClass} placeholder="اختياري" />
        </Field>
        <Field label="نوع الاشتراك">
          <select name="subscriptionType" className={inputClass}>
            {subscriptionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="نوع مخصص">
          <input name="customSubscriptionType" className={inputClass} placeholder="يستخدم عند اختيار أخرى" />
        </Field>
        <Field label="اسم الخدمة">
          <input required name="serviceName" className={inputClass} placeholder="Netflix, Canva, ChatGPT..." />
        </Field>
        <Field label="المدة">
          <select value={duration} onChange={(event) => setDuration(event.target.value as SubscriptionDuration)} className={inputClass}>
            <option value="day">يوم</option>
            <option value="week">أسبوع</option>
            <option value="month">شهر</option>
            <option value="quarter">3 أشهر</option>
            <option value="halfYear">6 أشهر</option>
            <option value="year">سنة</option>
            <option value="custom">مدة مخصصة</option>
          </select>
        </Field>
        {duration === "custom" && (
          <Field label="عدد أيام المدة المخصصة">
            <input type="number" min={1} value={customDays} onChange={(event) => setCustomDays(Number(event.target.value))} className={inputClass} />
          </Field>
        )}
        <Field label="تاريخ البداية">
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className={inputClass} />
        </Field>
        <Field label="تاريخ النهاية">
          <input readOnly value={endDate} className={inputClass} />
        </Field>
        <Field label="السعر">
          <input required name="price" type="number" min={0} step="0.01" className={inputClass} />
        </Field>
        <Field label="طريقة الدفع">
          <select name="paymentMethod" className={inputClass}>
            <option value="transfer">تحويل</option>
            <option value="card">بطاقة</option>
            <option value="online">دفع إلكتروني</option>
            <option value="cash">نقدًا</option>
          </select>
        </Field>
        <Field label="تصنيف العميل">
          <select name="tier" className={inputClass}>
            <option value="normal">عادي</option>
            <option value="vip">VIP</option>
          </select>
        </Field>
        <Field label="ملاحظات">
          <textarea name="notes" className={inputClass} rows={3} />
        </Field>
        <Field label="ملاحظات داخلية">
          <textarea name="internalNotes" className={inputClass} rows={3} />
        </Field>
        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">
            حفظ العميل
          </Button>
        </div>
      </form>
    </Card>
  );
}

