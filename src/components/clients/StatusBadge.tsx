import { clsx } from "clsx";
import type { Client } from "@/types";
import { statusLabel } from "@/utils/dates";

const map = {
  active: "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300",
  expiring: "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300",
  expired: "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  renewed: "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300",
};

export function StatusBadge({ client, alertDays = 5 }: { client: Client; alertDays?: number }) {
  return <span className={clsx("inline-flex rounded-full px-3 py-1 text-xs font-black", map[client.status])}>{statusLabel(client, alertDays)}</span>;
}
