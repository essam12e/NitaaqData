import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";

const faqs = [
  ["ما هو نطاق|داتا؟", "منصة SaaS لإدارة العملاء والاشتراكات الرقمية والفواتير والتنبيهات."],
  ["هل النظام مناسب لبيع اشتراكات رقمية؟", "نعم، للأنشطة القانونية والآمنة مثل التعليم، التصميم، الإنتاجية، التخزين، VPN، الألعاب، الموسيقى، وغيرها."],
  ["هل يمكنني إصدار فواتير؟", "نعم، النظام يحتوي على فواتير PDF قابلة للتحميل والطباعة والإرسال."],
  ["هل يوجد تنبيه قبل انتهاء الاشتراك؟", "نعم، افتراضيًا قبل 5 أيام ويمكن تغيير العدد من الإعدادات."],
  ["هل يمكنني تصدير البيانات Excel؟", "نعم، يمكن تصدير العملاء والاشتراكات والفواتير والتجديدات."],
  ["هل يوجد صلاحيات للموظفين؟", "نعم، Admin و Manager و Employee مع واجهة RBAC قابلة للتوسيع."],
  ["هل يعمل النظام على الجوال؟", "نعم، التصميم Responsive ويدعم Android و iPhone و Tablet و Laptop."],
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
      <SectionTitle title="الأسئلة الشائعة" text="إجابات مختصرة حول نطاق|داتا." />
      <div className="mx-auto grid max-w-4xl gap-4">
        {faqs.map(([question, answer]) => (
          <div key={question} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
            <h2 className="font-black">{question}</h2>
            <p className="mt-2 leading-8 text-slate-600 dark:text-slate-300">{answer}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link className="font-black text-cyan-500" href="/">العودة للرئيسية</Link>
      </div>
    </main>
  );
}

