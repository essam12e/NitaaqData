import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle2, FileSpreadsheet, FileText, Lock, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { AnimatedHeroStats } from "@/components/landing/AnimatedHeroStats";
import { SectionTitle } from "@/components/SectionTitle";
import { ButtonLink } from "@/components/ui";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { allowedFeatureIcons, plans } from "@/lib/constants";
import { planWhatsappUrl, whatsappUrl } from "@/utils/whatsapp";

const featureCards = [
  { icon: Users, title: "تسجيل العملاء", text: "احفظ بيانات العميل والاشتراك والموظف المسؤول في سجل واحد." },
  { icon: CheckCircle2, title: "تجديد الاشتراكات", text: "نموذج تجديد سريع مع حفظ سجل كامل للتجديدات." },
  { icon: Bell, title: "تنبيهات الانتهاء", text: "شارات ذكية للانتهاء خلال 5 أيام أو اليوم أو غدًا." },
  { icon: MessageCircle, title: "إرسال واتساب", text: "روابط واتساب ورسائل مخصصة لكل عميل وباقة." },
  { icon: FileText, title: "فواتير PDF", text: "فاتورة منظمة تحمل الشعار وقابلة للتحميل والطباعة." },
  { icon: FileSpreadsheet, title: "تصدير Excel", text: "تصدير العملاء والفواتير والتجديدات بتنسيق واضح." },
  { icon: ShieldCheck, title: "إدارة المستخدمين", text: "أدوار Admin و Manager و Employee جاهزة للتوسيع." },
  { icon: Lock, title: "حماية بيانات", text: "Firestore Rules مبدئية، وربط كل بيانات بالمؤسسة." },
];

export default function Home() {
  return (
    <main className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <LandingHeader />
      <section className="hero-grid relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="relative z-10">
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">نظام ذكي لإدارة اشتراكاتك الرقمية</h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-200">
              نطاق|داتا يساعدك على تنظيم العملاء، متابعة الاشتراكات، إصدار الفواتير، إرسال التنبيهات، وتحليل المبيعات من لوحة واحدة سهلة واحترافية.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/register" className="gap-2">
                ابدأ الآن <ArrowLeft className="h-4 w-4" />
              </ButtonLink>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-5 py-2 text-sm font-black text-white transition hover:bg-white/10"
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
              >
                تواصل واتساب
              </a>
            </div>
          </div>
          <div className="relative z-10">
            <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-white/15 bg-white/8 p-5 shadow-2xl backdrop-blur">
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-lg border border-cyan-300/20">
                <Image src="/nitaaq-logo.jpeg" alt="شعار نطاق|داتا" fill className="object-cover" priority />
              </div>
              <AnimatedHeroStats />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="من نحن"
          title="منصة عملية لأصحاب المتاجر وبائعي الاشتراكات"
          text="نطاق|داتا يجمع العملاء والاشتراكات والفواتير والتنبيهات والصلاحيات في نظام واحد مرتب، مع منع أي تصنيفات مشبوهة أو غير قانونية والتركيز على الاشتراكات الرقمية الآمنة."
        />
      </section>

      <section id="features" className="bg-slate-50 px-4 py-20 dark:bg-slate-900/55 sm:px-6 lg:px-8">
        <SectionTitle title="لماذا نطاق|داتا؟" text="كل ما تحتاجه لإدارة دورة الاشتراك من أول تسجيل العميل حتى التجديد والفاتورة." />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {allowedFeatureIcons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="animate-rise rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
              <Icon className="mb-4 h-7 w-7 text-cyan-500" />
              <h3 className="font-black">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle title="المميزات" text="بطاقات واضحة لكل أداة يحتاجها فريقك اليومي." />
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-cyan-300 dark:border-white/10">
              <Icon className="mb-4 h-6 w-6 text-violet-500" />
              <h3 className="font-black">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="plans" className="bg-slate-50 px-4 py-20 dark:bg-slate-900/55 sm:px-6 lg:px-8">
        <SectionTitle title="الباقات" text="اختر الباقة، سجل حسابك، ثم أدخل كود التفعيل المخصص لها." />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950">
              <h3 className="text-2xl font-black">{plan.title}</h3>
              <p className="mt-4 text-4xl font-black text-cyan-500">{plan.price} ريال</p>
              <p className="mt-2 text-slate-500">{plan.durationLabel}</p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={`/login?plan=${plan.id}`}>تفعيل الباقة</ButtonLink>
                <a className="text-center text-sm font-bold text-emerald-500" href={planWhatsappUrl(plan)} target="_blank" rel="noreferrer">
                  تفعيل عبر واتساب
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle title="الأسئلة الشائعة" />
        <div className="mx-auto grid max-w-4xl gap-3">
          {["ما هو نطاق|داتا؟", "هل النظام مناسب لبيع اشتراكات رقمية؟", "هل يمكنني إصدار فواتير؟", "هل يوجد تنبيه قبل انتهاء الاشتراك؟", "هل يمكنني تصدير البيانات Excel؟", "هل يوجد صلاحيات للموظفين؟", "هل يعمل النظام على الجوال؟"].map((q) => (
            <Link key={q} href="/faq" className="rounded-lg border border-slate-200 p-4 font-bold dark:border-white/10">
              {q}
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 px-4 py-10 dark:border-white/10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black">نطاق|داتا</h2>
            <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">نظام عربي منظم لإدارة الاشتراكات الرقمية والعملاء والفواتير.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-bold">
            <Link href="/privacy">الخصوصية</Link>
            <Link href="/terms">الاستخدام</Link>
            <Link href="/faq">الأسئلة</Link>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer">واتساب</a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-sm text-slate-500">© 2026 نطاق|داتا. جميع الحقوق محفوظة.</p>
      </footer>
      <WhatsAppFloat />
    </main>
  );
}
