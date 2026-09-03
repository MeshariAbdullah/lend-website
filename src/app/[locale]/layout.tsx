import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { getContent } from "@/content";
import { defaultLocale, dirOf, isLocale, localeHref, locales, siteUrl, type Locale } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#F5F5F0",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const raw = (await params).locale;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const path = localeHref(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: c.meta.title, template: `%s | ${c.meta.siteName}` },
    description: c.meta.description,
    keywords: c.meta.keywords,
    applicationName: c.meta.siteName,
    alternates: {
      canonical: path,
      languages: { ar: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: c.meta.siteName,
      title: c.meta.title,
      description: c.meta.description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [{ url: `/og/lend-og-${locale}.png`, width: 1200, height: 630, alt: c.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
      images: [`/og/lend-og-${locale}.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const raw = (await params).locale;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  return (
    <html lang={locale} dir={dirOf(locale)} className={`${inter.variable} ${plexArabic.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          {c.nav.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
