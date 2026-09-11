import { LocaleHtml, buildMetadata } from "@/lib/locale-layout";

export { viewport } from "@/lib/locale-layout";
export const metadata = buildMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LocaleHtml locale="en">{children}</LocaleHtml>;
}
