import { BRAND_PHONE, BRAND_WHATSAPP_MESSAGE } from "@/lib/constants";
import type { Client, Plan } from "@/types";
import { daysUntil } from "@/utils/dates";

export function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "").replace(/^00/, "+");
}

export function whatsappUrl(phone = BRAND_PHONE, message = BRAND_WHATSAPP_MESSAGE) {
  const cleanPhone = normalizePhone(phone).replace("+", "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function planWhatsappUrl(plan: Plan) {
  return whatsappUrl(BRAND_PHONE, plan.whatsappMessage);
}

export function clientReminderMessage(client: Client) {
  const days = daysUntil(client.endDate);
  if (days < 0) {
    return `مرحبا ${client.name}\nنود إبلاغك أن اشتراكك في ${client.serviceName} قد انتهى.\nيمكنك التجديد الآن للاستمرار في الخدمة.\nشكرا لك.`;
  }

  return `مرحبا ${client.name}\nنود تذكيرك أن اشتراكك في ${client.serviceName} سينتهي بعد ${days} يوم.\nيمكنك التجديد الآن للاستمرار بدون انقطاع.\nشكرا لك.`;
}

export async function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
}

