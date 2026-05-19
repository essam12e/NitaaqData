import { SectionTitle } from "@/components/SectionTitle";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
      <SectionTitle title="سياسة الاستخدام" text="استخدام واضح وآمن لنظام نطاق|داتا." />
      <article className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-7 leading-9 dark:border-white/10 dark:bg-slate-900">
        <h2 className="font-black">الاستخدام المسموح</h2>
        <p>يسمح باستخدام النظام لإدارة الاشتراكات الرقمية القانونية والآمنة مثل التعليم، الإنتاجية، التصميم، الاجتماعات، التخزين، والبرامج.</p>
        <h2 className="mt-6 font-black">الاستخدام الممنوع</h2>
        <p>يمنع استخدام نطاق|داتا لأي اشتراك إباحي، مشبوه، مخالف، احتيالي، أو ينتهك حقوق الملكية أو الأنظمة المحلية.</p>
        <h2 className="mt-6 font-black">الأكواد والتفعيل</h2>
        <p>كل كود تفعيل مخصص لباقته ولا يجوز مشاركته أو استخدامه بغير الطريقة المحددة.</p>
        <h2 className="mt-6 font-black">البيانات والصلاحيات</h2>
        <p>يجب منح الصلاحيات للموظفين حسب الحاجة فقط، ومراجعة سجلات النشاط بشكل دوري.</p>
        <h2 className="mt-6 font-black">الخدمات الخارجية</h2>
        <p>أي تكاملات مستقبلية مع خدمات خارجية يجب أن تكون آمنة ومتوافقة مع سياسات الخصوصية والصلاحيات.</p>
      </article>
    </main>
  );
}
