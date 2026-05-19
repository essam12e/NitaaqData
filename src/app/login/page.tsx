"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Button, Field, inputClass } from "@/components/ui";
import { loginWithEmail, loginWithGoogle } from "@/services/auth";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.78-.07-1.53-.2-2.23H12v4.22h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.52Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.25l-3.24-2.51c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.6-4.12H3.06v2.6A9.99 9.99 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 14.07A6 6 0 0 1 6.08 12c0-.72.12-1.42.32-2.07v-2.6H3.06A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.06 4.67l3.34-2.6Z" />
      <path fill="#EA4335" d="M12 5.81c1.47 0 2.78.5 3.82 1.5l2.87-2.87C16.95 2.82 14.7 2 12 2a9.99 9.99 0 0 0-8.94 5.33l3.34 2.6C7.2 7.57 9.4 5.81 12 5.81Z" />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [message, setMessage] = useState("");
  const [missingAccount, setMissingAccount] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await loginWithEmail(String(form.get("email")), String(form.get("password")));
      router.push(`/activation?plan=${params.get("plan") ?? "month"}`);
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
      const firebaseNotReady = error instanceof Error && error.message.includes("Firebase");

      if (code.includes("user-not-found") || code.includes("invalid-credential") || firebaseNotReady) {
        setMissingAccount(true);
        setMessage("هذا الحساب غير موجود أو بيانات الدخول غير صحيحة. إذا لم تسجل من قبل أنشئ حسابًا جديدًا.");
        return;
      }

      setMessage(error instanceof Error ? error.message : "تعذر تسجيل الدخول.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-cyan-50 via-white to-violet-50 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950">
      <div className="animate-rise w-full max-w-md rounded-lg border border-cyan-100 bg-white p-6 shadow-xl shadow-blue-950/5 dark:border-cyan-300/10 dark:bg-slate-900">
        <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-lg">
          <Image src="/nitaaq-logo.jpeg" alt="شعار نطاق|داتا" width={112} height={112} className="h-full w-full object-cover" />
        </div>
        <h1 className="text-center text-2xl font-black">تسجيل الدخول</h1>
        <p className="mt-2 text-center text-sm text-slate-500">بعد الدخول ستحتاج إلى كود تفعيل صحيح.</p>
        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <Field label="البريد الإلكتروني">
            <input required name="email" type="email" className={inputClass} />
          </Field>
          <Field label="كلمة المرور">
            <input required name="password" type="password" className={inputClass} />
          </Field>
          {message && (
            <div className="rounded-lg bg-gradient-to-l from-cyan-50 to-violet-50 p-3 text-sm font-bold text-blue-700">
              <p>{message}</p>
              {missingAccount && (
                <Link className="mt-2 inline-block text-violet-700 underline" href="/register">
                  إنشاء حساب جديد
                </Link>
              )}
            </div>
          )}
          <Button type="submit">دخول</Button>
        </form>
        <Button
          variant="ghost"
          className="mt-3 w-full gap-2"
          onClick={async () => {
            try {
              await loginWithGoogle();
            } finally {
              router.push(`/activation?plan=${params.get("plan") ?? "month"}`);
            }
          }}
        >
          <GoogleIcon />
          الدخول بجوجل
        </Button>
        <p className="mt-5 text-center text-sm">
          لا تملك حسابًا؟ <Link className="font-black text-cyan-500" href="/register">إنشاء حساب</Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
