"use client";

import type { PlanType } from "@/types";

export async function activatePlan(planType: PlanType, code: string, userId: string) {
  const response = await fetch("/api/activation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planType, code, userId }),
  });

  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message ?? "تعذر تفعيل الباقة.");
  return payload as { expiresAt: string; activatedAt: string; planType: PlanType };
}

