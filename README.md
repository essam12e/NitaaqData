# نطاق|داتا - Nitaaq Data

نظام SaaS عربي لإدارة الاشتراكات الرقمية القانونية والآمنة: العملاء، التنبيهات، الفواتير PDF، التصدير Excel، واتساب، الصلاحيات، والتقارير.

## التشغيل محليًا

```bash
npm install
npm run dev
```

افتح `http://localhost:3000`.

## ربط Firebase

1. أنشئ مشروع Firebase.
2. فعّل Authentication:
   - Email/Password
   - Google
3. فعّل Firestore Database.
4. فعّل Firebase Storage إذا أردت رفع شعار أو إثبات دفع.
5. انسخ `.env.example` إلى `.env.local` وضع قيم مشروعك.
6. انشر قواعد Firestore و Storage:

```bash
firebase deploy --only firestore:rules,storage
```

## هيكل قاعدة البيانات

المجموعات المقترحة:

- `users`
- `organizations`
- `clients`
- `subscriptions`
- `invoices`
- `renewals`
- `activationCodes`
- `settings`
- `activityLogs`

كل مستند تشغيلي يجب أن يحتوي `organizationId` حتى تعمل قواعد العزل بين المؤسسات.

## أكواد التفعيل

الواجهة لا تعرض الأكواد. منطق التحقق موجود في API server-side داخل:

`src/app/api/activation/route.ts`

في الإنتاج الأفضل نقل الأكواد إلى Firestore أو Firebase Functions مع تخزين الحالة:

```ts
{
  codeHash: string,
  status: "unused" | "used",
  userId?: string,
  planType: "month" | "quarter" | "halfYear",
  activatedAt?: string,
  expiresAt?: string,
  reusable: false
}
```

الأكواد الحالية مخصصة للباقات المطلوبة:

- شهر: `NT7K2R9W`, `NT4M9P1Z`, `NT8H3X6Q`
- ثلاثة أشهر: `NT2L5V7B`, `NT9C1N4J`, `NT6F8S2D`
- ستة أشهر: `NT3W7G9M`, `NT5P4K1H`, `NT1B6R8V`

## الفواتير PDF

الفواتير تستخدم `jspdf` و `jspdf-autotable`. زر التحميل موجود في صفحة الفواتير وتفاصيل العميل.

ملاحظة: دعم العربية في PDF يعتمد على تضمين خط عربي عند الإنتاج. البنية جاهزة، ويمكن إضافة ملف خط داخل `public/fonts` ثم تسجيله في `src/utils/invoice.ts`.

## تصدير Excel

التصدير يستخدم `xlsx` من صفحة `Export Data` ويولد ملفًا يحتوي:

- العملاء
- الفواتير
- التجديدات
- الحالات
- التواريخ
- الأسعار
- الموظف المسؤول

## النشر على Vercel

1. ارفع المشروع إلى GitHub.
2. اربط المستودع في Vercel.
3. أضف متغيرات البيئة نفسها الموجودة في `.env.example`.
4. نفّذ النشر.

يفضل ضبط:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

حتى تعمل معاينة Open Graph بشكل صحيح.

## تعديل الشعار والألوان

- الشعار الرسمي موجود في `public/nitaaq-logo.jpeg`.
- صورة المعاينة في `public/og-image.jpeg`.
- Metadata في `src/app/layout.tsx`.
- الألوان العامة والحركة في `src/app/globals.css`.

## الصلاحيات

الأدوار المدعومة:

- `admin`: صلاحيات كاملة.
- `manager`: إدارة العملاء والفواتير والتقارير والتصدير دون تعديل التفعيل.
- `employee`: إضافة عميل، تعديل عملائه عند السماح، واتساب، وفاتورة.

قواعد RBAC المبدئية موجودة في `firestore.rules`، ويجب مراجعتها حسب نموذج المستخدم النهائي قبل الإنتاج.

## ملاحظات إنتاجية

- لا تستخدم LocalStorage لتخزين معلومات حساسة.
- فعّل App Check في Firebase عند الإطلاق.
- انقل تفعيل الأكواد إلى Cloud Function لتجنب أي تلاعب.
- أضف خط عربي لـ PDF قبل الاعتماد التجاري.
- راجع `npm audit` دوريًا وحدّث الحزم عند الحاجة.
