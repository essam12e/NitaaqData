"use client";

import { useEffect, useState } from "react";

const metrics = [
  { label: "عدد العملاء", value: 248, suffix: "", width: "72%" },
  { label: "اشتراكات تنتهي قريبًا", value: 18, suffix: "", width: "46%" },
  { label: "مبيعات الشهر", value: 23450, suffix: " ريال", width: "82%" },
];

export function AnimatedHeroStats() {
  return (
    <div className="mt-6 grid gap-3">
      {metrics.map((metric, index) => (
        <AnimatedMetric key={metric.label} {...metric} delay={index * 120} />
      ))}
    </div>
  );
}

function AnimatedMetric({ label, value, suffix, width, delay }: { label: string; value: number; suffix: string; width: string; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;
    const timeout = window.setTimeout(() => {
      const animate = (timestamp: number) => {
        start ??= timestamp;
        const progress = Math.min((timestamp - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * eased));
        if (progress < 1) frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [delay, value]);

  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4 text-white">
      <span className="text-sm font-bold text-cyan-200">
        {label} {count.toLocaleString("ar-SA")}
        {suffix}
      </span>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-l from-cyan-300 via-blue-300 to-violet-400 transition-[width] duration-1000" style={{ width }} />
      </div>
    </div>
  );
}

