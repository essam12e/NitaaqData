import Link from "next/link";
import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-gradient-to-l from-cyan-400 via-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30",
  secondary: "bg-gradient-to-l from-slate-900 to-blue-900 text-white hover:from-blue-950 hover:to-violet-950",
  ghost: "border border-cyan-100 bg-white/80 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 dark:border-cyan-300/15 dark:bg-white/5 dark:text-white dark:hover:bg-cyan-400/10",
  danger: "bg-gradient-to-l from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-cyan-500",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode; variant?: keyof typeof variants }) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2 text-sm font-black transition duration-200 hover:-translate-y-0.5",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: keyof typeof variants }) {
  return (
    <button
      className={clsx(
        "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2 text-sm font-black transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={clsx("animate-rise rounded-lg border border-cyan-100 bg-white p-5 shadow-sm shadow-blue-950/5 dark:border-cyan-300/10 dark:bg-slate-900", className)} {...props}>
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
      {label}
      {children}
      {hint && <span className="text-xs font-medium text-slate-500">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "min-h-11 w-full min-w-0 rounded-lg border border-cyan-100 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-cyan-300/15 dark:bg-slate-950 dark:text-white";
