import { MessageCircle } from "lucide-react";
import { BRAND_PHONE, BRAND_WHATSAPP_MESSAGE } from "@/lib/constants";
import { whatsappUrl } from "@/utils/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(BRAND_PHONE, BRAND_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-l from-cyan-400 via-blue-500 to-violet-600 text-white shadow-2xl shadow-blue-500/30 transition hover:-translate-y-1"
      aria-label="تواصل واتساب"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
