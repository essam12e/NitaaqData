import {
  BarChart3,
  Bell,
  CalendarDays,
  Download,
  FileText,
  MessageCircle,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { BusinessSettings, Plan } from "@/types";

export const APP_NAME_AR = "نطاق|داتا";
export const APP_NAME_EN = "Nitaaq Data";
export const BRAND_PHONE = "+966573730430";
export const BRAND_WHATSAPP_MESSAGE = "مرحبا، أريد تفعيل باقة نطاق|داتا";

export const plans: Plan[] = [
  {
    id: "month",
    title: "باقة شهر",
    price: 99,
    durationLabel: "شهر واحد",
    months: 1,
    whatsappMessage: "مرحبا، أريد تفعيل باقة شهر في نطاق|داتا",
  },
  {
    id: "quarter",
    title: "باقة ثلاثة أشهر",
    price: 199,
    durationLabel: "3 أشهر",
    months: 3,
    whatsappMessage: "مرحبا، أريد تفعيل باقة ثلاثة أشهر في نطاق|داتا",
  },
  {
    id: "halfYear",
    title: "باقة ستة أشهر",
    price: 299,
    durationLabel: "6 أشهر",
    months: 6,
    whatsappMessage: "مرحبا، أريد تفعيل باقة ستة أشهر في نطاق|داتا",
  },
];

export const subscriptionTypes = [
  "منصات ترفيه",
  "منصات تعليم",
  "أدوات ذكاء اصطناعي",
  "أدوات تصميم",
  "أدوات مونتاج",
  "تخزين سحابي",
  "برامج مكتبية",
  "أدوات إنتاجية",
  "أدوات تسويق",
  "أدوات إدارة مشاريع",
  "أدوات برمجة",
  "VPN",
  "ألعاب",
  "موسيقى",
  "كتب رقمية",
  "رياضة",
  "اجتماعات واتصال",
  "أخرى",
];

export const allowedFeatureIcons = [
  { icon: Users, title: "إدارة العملاء", text: "ملفات عملاء منظمة وسجل كامل لكل اشتراك." },
  { icon: CalendarDays, title: "متابعة الاشتراكات", text: "حساب تلقائي للتواريخ والحالات الذكية." },
  { icon: Bell, title: "تنبيهات قبل الانتهاء", text: "تنبيهات واضحة حسب عدد الأيام المحدد." },
  { icon: FileText, title: "فواتير PDF", text: "فواتير عربية جاهزة للطباعة والإرسال." },
  { icon: Download, title: "تصدير Excel", text: "تصدير العملاء والفواتير والتجديدات." },
  { icon: ShieldCheck, title: "صلاحيات موظفين", text: "Admin و Manager و Employee بصلاحيات مفهومة." },
  { icon: MessageCircle, title: "واتساب مباشر", text: "رسائل تذكير وتجديد جاهزة بنقرة واحدة." },
  { icon: BarChart3, title: "لوحة تحكم ذكية", text: "مؤشرات ورسوم تساعدك على فهم المبيعات." },
  { icon: Settings, title: "حماية وإعدادات", text: "إعدادات نشاطك ورسائلك وفواتيرك في مكان واحد." },
];

export const defaultSettings: BusinessSettings = {
  businessName: APP_NAME_AR,
  whatsapp: BRAND_PHONE,
  email: "billing@nitaaq-data.sa",
  currency: "SAR",
  alertDays: 5,
  invoiceTaxEnabled: false,
  invoiceTaxRate: 15,
  invoiceThanks: "شكرا لثقتكم في نطاق|داتا",
  messageTemplate:
    "مرحبا {name}\nنود تذكيرك أن اشتراكك في {service} سينتهي بعد {days} يوم.\nيمكنك التجديد الآن للاستمرار بدون انقطاع.\nشكرا لك.",
};
