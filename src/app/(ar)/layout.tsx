import { LocaleHtml, buildMetadata } from "@/lib/locale-layout";

export { viewport } from "@/lib/locale-layout";
export const metadata = buildMetadata("ar");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LocaleHtml locale="ar">{children}</LocaleHtml>;
}
