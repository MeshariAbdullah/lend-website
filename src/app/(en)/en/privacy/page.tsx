import { LegalPage, legalMetadata } from "@/lib/legal-page";

export const metadata = legalMetadata("privacy", "en");

export default function Page() {
  return <LegalPage kind="privacy" locale="en" />;
}
