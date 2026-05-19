import { addMonths, format } from "date-fns";
import { NextResponse } from "next/server";
import { planMonths, serverActivationCodes } from "@/lib/activation-codes.server";
import type { PlanType } from "@/types";

const usedCodes = new Map<string, { userId: string; planType: PlanType; activatedAt: string; expiresAt: string }>();

export async function POST(request: Request) {
  const body = (await request.json()) as { planType?: PlanType; code?: string; userId?: string };
  const planType = body.planType;
  const code = body.code?.trim().toUpperCase();
  const userId = body.userId;

  if (!planType || !code || !userId) {
    return NextResponse.json({ message: "يرجى إدخال كود التفعيل واختيار الباقة." }, { status: 400 });
  }

  const codePlan = (Object.keys(serverActivationCodes) as PlanType[]).find((key) => serverActivationCodes[key].includes(code));

  if (!codePlan) {
    return NextResponse.json({ message: "كود التفعيل غير صحيح." }, { status: 404 });
  }

  if (codePlan !== planType) {
    return NextResponse.json({ message: "الكود غير مخصص لهذه الباقة." }, { status: 409 });
  }

  if (usedCodes.has(code)) {
    return NextResponse.json({ message: "تم استخدام هذا الكود مسبقًا." }, { status: 409 });
  }

  const activatedAt = format(new Date(), "yyyy-MM-dd");
  const expiresAt = format(addMonths(new Date(), planMonths[planType]), "yyyy-MM-dd");
  usedCodes.set(code, { userId, planType, activatedAt, expiresAt });

  return NextResponse.json({
    status: "used",
    userId,
    planType,
    activatedAt,
    expiresAt,
  });
}

