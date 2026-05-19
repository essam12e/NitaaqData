import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";

export function StatsCard({ title, value, icon: Icon, tone }: { title: string; value: string | number; icon: LucideIcon; tone: string }) {
  return (
    <Card className="animate-rise">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${tone}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}

