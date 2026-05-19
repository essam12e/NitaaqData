import type { PlanType } from "@/types";

export const serverActivationCodes: Record<PlanType, string[]> = {
  month: ["NT7K2R9W", "NT4M9P1Z", "NT8H3X6Q"],
  quarter: ["NT2L5V7B", "NT9C1N4J", "NT6F8S2D"],
  halfYear: ["NT3W7G9M", "NT5P4K1H", "NT1B6R8V"],
};

export const planMonths: Record<PlanType, number> = {
  month: 1,
  quarter: 3,
  halfYear: 6,
};

