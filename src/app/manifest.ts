import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lend",
    short_name: "Lend",
    description: "Lend | A clearer, documented rental experience",
    start_url: "/",
    display: "browser",
    background_color: "#F5F5F0",
    theme_color: "#1B2951",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
