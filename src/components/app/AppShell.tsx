"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CalendarClock,
  Download,
  FileText,
  Home,
  LogOut,
  RefreshCw,
  Settings,
  Shield,
  UserCircle,
  Users,
} from "lucide-react";
import { clsx } from "clsx";
import { BrandLogo } from "@/components/BrandLogo";
import { useWorkspace } from "@/hooks/useWorkspace";

const navItems = [
  { href: "/dashboard", label: "لوحة التحكم", icon: Home },
  { href: "/clients", label: "العملاء", icon: Users },
  { href: "/subscriptions", label: "الاشتراكات", icon: CalendarClock },
  { href: "/invoices", label: "الفواتير", icon: FileText },
  { href: "/renewals", label: "التجديدات", icon: RefreshCw },
  { href: "/alerts", label: "التنبيهات", icon: Bell },
  { href: "/reports", label: "التقارير", icon: BarChart3 },
  { href: "/users", label: "المستخدمون", icon: Shield },
  { href: "/export", label: "تصدير البيانات", icon: Download },
  { href: "/settings", label: "الإعدادات", icon: Settings },
  { href: "/profile", label: "الملف الشخصي", icon: UserCircle },
];

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useWorkspace();

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-72 border-l border-cyan-100 bg-white p-5 shadow-sm dark:border-cyan-300/10 dark:bg-slate-900 lg:block">
        <BrandLogo href="/dashboard" />
        <nav className="mt-8 grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition duration-200 hover:-translate-x-1",
                  active
                    ? "bg-gradient-to-l from-cyan-400/15 via-blue-500/15 to-violet-600/15 text-blue-700 dark:text-cyan-200"
                    : "text-slate-600 hover:bg-cyan-50 dark:text-slate-300 dark:hover:bg-cyan-400/10",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 lg:pr-72">
        <header className="sticky top-0 z-30 border-b border-cyan-100 bg-white/90 backdrop-blur-xl dark:border-cyan-300/10 dark:bg-slate-950/90">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <p className="text-xs font-bold text-cyan-500">نطاق|داتا</p>
              <h1 className="truncate text-2xl font-black">{title}</h1>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden text-left sm:block">
                <p className="text-sm font-black">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <Link href="/settings" className="rounded-lg border border-cyan-100 p-2 transition hover:border-cyan-300 dark:border-cyan-300/10" aria-label="الإعدادات">
                <Settings className="h-5 w-5" />
              </Link>
              <Link href="/login" className="rounded-lg border border-cyan-100 p-2 text-blue-600 transition hover:border-cyan-300 dark:border-cyan-300/10" aria-label="الخروج">
                <LogOut className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="shrink-0 rounded-lg border border-cyan-100 bg-white px-3 py-2 text-xs font-bold dark:border-cyan-300/10 dark:bg-slate-900">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
