import { LegalPage, legalMetadata } from "@/lib/legal-page";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return legalMetadata("terms", params);
}

export default function TermsPage({ params }: Props) {
  return <LegalPage kind="terms" params={params} />;
}
