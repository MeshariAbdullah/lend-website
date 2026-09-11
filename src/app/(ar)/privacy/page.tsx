import { LegalPage, legalMetadata } from "@/lib/legal-page";

export const metadata = legalMetadata("privacy", "ar");

export default function Page() {
  return <LegalPage kind="privacy" locale="ar" />;
}
