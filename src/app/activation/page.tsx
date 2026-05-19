"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Button, Card, Field, inputClass } from "@/components/ui";
import { plans } from "@/lib/constants";
import type { PlanType } from "@/types";
import { activatePlan } from "@/services/activation";

function ActivationForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState<PlanType>((params.get("plan") as PlanType) ?? "month");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const code = String(new FormData(event.currentTarget).get("code"));
    try {
      const result = await activatePlan(plan, code, "u-admin");
      setMessage(`تم التفعيل بنجاح حتى ${result.expiresAt}`);
      setTimeout(() => router.push("/dashboard"), 650);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذر التفعيل.");
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-black">تفعيل الباقة</h1>
      <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">اختر الباقة التي طلبتها ثم أدخل كود التفعيل. كل كود يعمل فقط مع باقته المخصصة.</p>
      <form className="mt-6 grid gap-4" onSubmit={submit}>
        <Field label="الباقة">
          <select value={plan} onChange={(event) => setPlan(event.target.value as PlanType)} className={inputClass}>
            {plans.map((item) => (
              <option key={item.id} value={item.id}>{item.title} - {item.price} ريال</option>
            ))}
          </select>
        </Field>
        <Field label="كود التفعيل">
          <input required name="code" className={`${inputClass} text-left uppercase`} dir="ltr" placeholder="NTXXXXXX" />
        </Field>
        {message && <p className="rounded-lg bg-cyan-50 p-3 text-sm font-black text-cyan-700">{message}</p>}
        <Button type="submit">تفعيل ودخول لوحة التحكم</Button>
      </form>
    </Card>
  );
}

export default function ActivationPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950">
      <Suspense>
        <ActivationForm />
      </Suspense>
    </main>
  );
}

