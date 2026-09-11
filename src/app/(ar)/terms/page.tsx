import { LegalPage, legalMetadata } from "@/lib/legal-page";

export const metadata = legalMetadata("terms", "ar");

export default function Page() {
  return <LegalPage kind="terms" locale="ar" />;
}
