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
import { localeHref, merchantPortalUrl, otherLocale, type Locale } from "@/lib/i18n";

/** The single-page marketing site. Section ids are the nav targets. */
export function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const home = localeHref(locale);
  // Same-page fragment links: plain anchors, never client-side route navigations.
  const anchor = (id: string) => `${home}#${id}`;

  return (
    <>
      <Header
        homeHref={home}
        brandName={c.brand.name}
        links={[
          { href: home, label: c.nav.home },
          { href: anchor("how"), label: c.nav.how },
          { href: anchor("customers"), label: c.nav.customers },
          { href: anchor("business"), label: c.nav.business },
          { href: anchor("faq"), label: c.nav.faq },
        ]}
        cta={{ href: anchor("contact"), label: c.nav.cta }}
        merchantLogin={{ href: merchantPortalUrl, label: c.nav.merchantLogin }}
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
