import { LegalPage, legalMetadata } from "@/lib/legal-page";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return legalMetadata("privacy", params);
}

export default function PrivacyPage({ params }: Props) {
  return <LegalPage kind="privacy" params={params} />;
}
