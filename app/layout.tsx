import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

/*
 * TYPOGRAPHY - see app/fonts/README.md for the licence position.
 * ------------------------------------------------------------------
 * The brand faces are Camera Obscura (display), Good Brush 9 (script) and
 * Bellavoir Delight. Each raw face is exposed as a --ff-* variable here; the
 * semantic tokens (--font-display / --font-script / --font-sans) are assembled
 * in globals.css so no component ever names a font directly.
 *
 * All three brand faces are in use. The client is purchasing the licences.
 *
 * The unicode-range guards below are NOT about licensing - they are about the
 * files. The supplied Camera Obscura and Bellavoir builds are demo/personal
 * versions whose NUMERALS are replaced with watermark glyphs ("ikiiko.com",
 * "PERSONAL USE ONLY"), verified by rendering. Both are therefore scoped to
 * exclude U+0030-0039, so digits fall through to the serif companion and a
 * price can never render as a watermark. Drop the licensed full versions into
 * app/fonts/ under the same filenames and delete the two `declarations`
 * blocks - nothing else changes.
 */

// --- Display: Camera Obscura. Digits excluded (see note above). ---
const cameraObscura = localFont({
  src: "./fonts/CameraObscura.woff2",
  variable: "--ff-camera",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0000-002F, U+003A-10FFFF" }],
});

// --- Script: Good Brush 9. Full Latin + numerals verified clean. ---
const goodBrush = localFont({
  src: "./fonts/GoodBrush9.woff2",
  variable: "--ff-brush",
  display: "swap",
});

// --- Accent: Bellavoir Delight. A high-contrast calligraphic italic, used for
//     short editorial asides only (dish notes, pull-quotes) - never for body.
//     Digits are excluded for the same reason as Camera Obscura. ---
const bellavoir = localFont({
  src: "./fonts/BellavoirDelight.woff2",
  variable: "--ff-bellavoir",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0000-002F, U+003A-10FFFF" }],
});

// --- Serif companion: carries the digits Camera Obscura can't, and is the
//     fallback if the display face fails to load. Visually compatible. ---
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--ff-serif",
  display: "swap",
});

// --- Body + UI. Matches the geometric sans in the printed menu. ---
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-sans",
  display: "swap",
});

const fontVars = [
  cameraObscura.variable,
  goodBrush.variable,
  bellavoir.variable,
  playfair.variable,
  montserrat.variable,
].join(" ");

const LOGO_MARK = "/assets/Logos-20260709T183558Z-2-001/Logos/Khao San Logo.webp";
const OG_IMAGE =
  "/assets/Background-20260709T183540Z-2-001/Background/Elephant%2016%20by%209%20Ratio%20Landscape.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://khaosan.com.bd"),
  title: "Khao San | Re-inventing The Thai Way",
  description:
    "Authentic Thai street food, quietly elevated. Three dining rooms across Dhaka - Gulshan, Dhanmondi and Uttara.",
  keywords: [
    "Thai Food Dhaka",
    "Khao San",
    "Best Thai Restaurant",
    "Tom Yum Goong",
    "Pad Thai",
    "Gulshan Restaurant",
  ],
  openGraph: {
    title: "Khao San | Re-inventing The Thai Way",
    description: "Authentic Thai street food, quietly elevated. Three dining rooms across Dhaka.",
    url: "https://khaosan.com.bd",
    siteName: "Khao San",
    images: [{ url: OG_IMAGE, width: 1920, height: 1080, alt: "Khao San Restaurant" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khao San | Re-inventing The Thai Way",
    description: "Authentic Thai street food, quietly elevated. Three dining rooms across Dhaka.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={fontVars}
      // data-ignition is deliberately set by the inline script below, before
      // hydration - the same sanctioned pattern no-flash theme scripts use.
      // SSR can't know it, so the attribute intentionally differs client-side.
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/webp" href={LOGO_MARK} />
        <meta name="theme-color" content="#1e417b" />
        {/*
          Sets data-ignition before first paint so the homepage's opening
          sequence never flashes unstyled. Once per browser session, homepage
          only, and skipped entirely under reduced motion.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{d.setAttribute('data-reveal','on');var isHome=location.pathname==='/';var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=sessionStorage.getItem('khaosan-ignited')==='1';d.setAttribute('data-ignition',(isHome&&!reduced&&!seen)?'igniting':'lit');}catch(e){d.setAttribute('data-ignition','lit');}})();`,
          }}
        />
      </head>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
