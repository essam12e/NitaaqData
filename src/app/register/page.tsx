"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button, Field, inputClass } from "@/components/ui";
import { registerWithEmail } from "@/services/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await registerWithEmail(String(form.get("name")), String(form.get("email")), String(form.get("password")));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تم إنشاء حساب تجريبي.");
    } finally {
      router.push("/activation");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-lg">
          <Image src="/nitaaq-logo.jpeg" alt="شعار نطاق|داتا" width={112} height={112} className="h-full w-full object-cover" />
        </div>
        <h1 className="text-center text-2xl font-black">إنشاء حساب</h1>
        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <Field label="الاسم">
            <input required name="name" className={inputClass} />
          </Field>
          <Field label="البريد الإلكتروني">
            <input required name="email" type="email" className={inputClass} />
          </Field>
          <Field label="كلمة المرور">
            <input required name="password" type="password" minLength={6} className={inputClass} />
          </Field>
          {message && <p className="rounded-lg bg-gradient-to-l from-cyan-50 to-violet-50 p-3 text-sm font-bold text-blue-700">{message}</p>}
          <Button type="submit">إنشاء الحساب والمتابعة</Button>
        </form>
        <p className="mt-5 text-center text-sm">
          لديك حساب؟ <Link className="font-black text-cyan-500" href="/login">تسجيل الدخول</Link>
        </p>
      </div>
    </main>
  );
}
