import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BusinessCta } from "@/components/sections/BusinessCta";
import { Faq } from "@/components/sections/Faq";
import { ForBusinesses } from "@/components/sections/ForBusinesses";
import { ForCustomers } from "@/components/sections/ForCustomers";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductExperience } from "@/components/sections/ProductExperience";
import { Trust } from "@/components/sections/Trust";
import { WhyLend } from "@/components/sections/WhyLend";
import { getContent } from "@/content";
import { isLocale, localeHref, otherLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);
  const home = localeHref(locale);
  const anchor = (id: string) => `${home}#${id}`;

  return (
    <>
      <Header
        homeHref={home}
        brandName={c.brand.name}
        links={[
          { href: anchor("top"), label: c.nav.home },
          { href: anchor("how"), label: c.nav.how },
          { href: anchor("customers"), label: c.nav.customers },
          { href: anchor("business"), label: c.nav.business },
          { href: anchor("faq"), label: c.nav.faq },
        ]}
        cta={{ href: anchor("contact"), label: c.nav.cta }}
        switchHref={localeHref(otherLocale(locale))}
        switchLabel={c.nav.switchLabel}
        switchTo={c.nav.switchTo}
        openMenu={c.nav.openMenu}
        closeMenu={c.nav.closeMenu}
      />
      <main id="main" className="flex-1">
        <Hero c={c} locale={locale} />
        <WhyLend c={c} />
        <HowItWorks c={c} />
        <ForCustomers c={c} />
        <ForBusinesses c={c} locale={locale} />
        <ProductExperience c={c} />
        <Trust c={c} />
        <Faq c={c} />
        <BusinessCta c={c} locale={locale} />
      </main>
      <Footer c={c} locale={locale} />
    </>
  );
}
