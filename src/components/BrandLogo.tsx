import Image from "next/image";
import Link from "next/link";
import { APP_NAME_AR, APP_NAME_EN } from "@/lib/constants";

interface BrandLogoProps {
  compact?: boolean;
  href?: string;
}

export function BrandLogo({ compact = false, href = "/" }: BrandLogoProps) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-cyan-300/25 bg-slate-950 shadow-glow">
        <Image src="/nitaaq-logo.jpeg" alt="شعار نطاق|داتا" fill sizes="48px" className="object-cover" priority />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="text-lg font-black text-slate-950 dark:text-white">{APP_NAME_AR}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-500">{APP_NAME_EN}</p>
        </div>
      )}
    </div>
  );

  return <Link href={href}>{content}</Link>;
}

