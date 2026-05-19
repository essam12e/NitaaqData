"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ButtonLink } from "@/components/ui";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/85 backdrop-blur-xl dark:bg-slate-950/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 dark:text-slate-300 lg:flex">
          <a href="#about">من نحن</a>
          <a href="#features">المميزات</a>
          <a href="#plans">الباقات</a>
          <Link href="/faq">الأسئلة</Link>
          <Link href="/terms">الاستخدام</Link>
          <Link href="/privacy">الخصوصية</Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/login" variant="ghost">
            دخول
          </ButtonLink>
          <ButtonLink href="/register">ابدأ الآن</ButtonLink>
        </div>
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

