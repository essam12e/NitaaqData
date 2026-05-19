import type { Metadata, Viewport } from "next";
import { WorkspaceProvider } from "@/hooks/useWorkspace";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitaaq-data.vercel.app"),
  title: "نطاق|داتا - نظام إدارة الاشتراكات الرقمية",
  description: "منصة ذكية لإدارة العملاء والاشتراكات الرقمية، إصدار الفواتير، التنبيهات، التصدير، والصلاحيات.",
  openGraph: {
    title: "نطاق|داتا - نظام إدارة الاشتراكات الرقمية",
    description: "نظام SaaS عربي لإدارة العملاء والاشتراكات الرقمية والفواتير والتنبيهات.",
    images: [{ url: "/og-image.jpeg", width: 1024, height: 1024, alt: "شعار نطاق|داتا" }],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "نطاق|داتا - نظام إدارة الاشتراكات الرقمية",
    description: "إدارة اشتراكاتك الرقمية من لوحة واحدة.",
    images: ["/og-image.jpeg"],
  },
  icons: {
    icon: "/nitaaq-logo.jpeg",
    apple: "/nitaaq-logo.jpeg",
  },
};

export const viewport: Viewport = {
  themeColor: "#07111f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </body>
    </html>
  );
}
