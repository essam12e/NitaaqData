import { SectionTitle } from "@/components/SectionTitle";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
      <SectionTitle title="سياسة الخصوصية" text="نطاق|داتا يحترم خصوصية المستخدمين وبيانات عملائهم." />
      <article className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-7 leading-9 dark:border-white/10 dark:bg-slate-900">
        <h2 className="font-black">البيانات المخزنة</h2>
        <p>نخزن بيانات الحساب، بيانات المؤسسة، العملاء، الاشتراكات، الفواتير، التجديدات، الإعدادات، وسجل النشاط اللازم لتشغيل النظام.</p>
        <h2 className="mt-6 font-black">طريقة الاستخدام</h2>
        <p>تستخدم البيانات لإدارة الاشتراكات، عرض التنبيهات، إنشاء الفواتير، تصدير التقارير، وتطبيق الصلاحيات.</p>
        <h2 className="mt-6 font-black">حماية البيانات</h2>
        <p>يعتمد النظام على Firebase Auth و Firestore Security Rules، وكل مؤسسة ترى بياناتها فقط عند إعداد القواعد بصورة صحيحة.</p>
        <h2 className="mt-6 font-black">عدم بيع البيانات</h2>
        <p>لا يتم بيع بيانات المستخدمين أو عملائهم لأي طرف ثالث.</p>
        <h2 className="mt-6 font-black">مسؤولية المستخدم</h2>
        <p>المستخدم مسؤول عن صحة بيانات عملائه والحصول على الموافقات المطلوبة للتواصل معهم عبر واتساب.</p>
      </article>
    </main>
  );
}
