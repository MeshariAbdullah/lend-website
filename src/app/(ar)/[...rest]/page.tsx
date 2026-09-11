import { notFound } from "next/navigation";

/** Any unknown path under this language root renders its localized not-found page. */
export default function CatchAll() {
  notFound();
}
