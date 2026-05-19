import { addDays, addMonths, differenceInCalendarDays, format, isAfter, isBefore, parseISO } from "date-fns";
import type { Client, SubscriptionDuration, SubscriptionStatus } from "@/types";

export function todayISO() {
  return format(new Date(), "yyyy-MM-dd");
}

export function formatArabicDate(date: string) {
  return new Intl.DateTimeFormat("ar-SA", { year: "numeric", month: "long", day: "numeric" }).format(parseISO(date));
}

export function calculateEndDate(startDate: string, duration: SubscriptionDuration, customDays = 1) {
  const start = parseISO(startDate);
  const end =
    duration === "day"
      ? addDays(start, 1)
      : duration === "week"
        ? addDays(start, 7)
        : duration === "month"
          ? addMonths(start, 1)
          : duration === "quarter"
            ? addMonths(start, 3)
            : duration === "halfYear"
              ? addMonths(start, 6)
              : duration === "year"
                ? addMonths(start, 12)
                : addDays(start, Math.max(customDays, 1));

  return format(end, "yyyy-MM-dd");
}

export function daysUntil(date: string) {
  return differenceInCalendarDays(parseISO(date), new Date());
}

export function resolveStatus(endDate: string, alertDays = 5, renewedAt?: string): SubscriptionStatus {
  const end = parseISO(endDate);
  if (renewedAt && differenceInCalendarDays(new Date(), parseISO(renewedAt)) <= 2) return "renewed";
  if (isBefore(end, new Date())) return "expired";
  if (differenceInCalendarDays(end, new Date()) <= alertDays) return "expiring";
  if (isAfter(end, new Date())) return "active";
  return "expired";
}

export function enrichClientStatus(client: Client, alertDays = 5): Client {
  return { ...client, status: resolveStatus(client.endDate, alertDays, client.renewedAt) };
}

export function statusLabel(client: Client, alertDays = 5) {
  const days = daysUntil(client.endDate);
  if (days < 0) return "منتهي";
  if (days === 0) return "ينتهي اليوم";
  if (days === 1) return "ينتهي غدًا";
  if (days <= alertDays) return `ينتهي خلال ${days} أيام`;
  if (client.status === "renewed") return "تم التجديد";
  return "نشط";
}

