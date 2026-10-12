import type { Metadata, Viewport } from "next";
import { Cormorant, Instrument_Sans } from "next/font/google";
import { leSignature, site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  keywords: [
    "harmonização facial Brasília",
    "harmonização facial Águas Claras",
    "botox Brasília",
    "preenchimento labial Brasília",
    "bioestimulador de colágeno",
    "Dra. Karen Xavier",
    "Le Signature",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ee",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#karen`,
      name: site.name,
      jobTitle: `${site.role}, ${site.specialty}`,
      url: site.url,
      image: `${site.url}/images/karen-retrato.jpg`,
      sameAs: [site.instagram.url],
      worksFor: { "@id": `${site.url}/#clinica` },
      identifier: site.cro,
    },
    {
      "@type": ["Dentist", "MedicalBusiness"],
      "@id": `${site.url}/#clinica`,
      name: `${site.name} | ${site.specialty}`,
      url: site.url,
      image: `${site.url}/images/karen-retrato.jpg`,
      description: site.description,
      telephone: `+${site.whatsapp.number}`,
      areaServed: "Brasília, DF",
      address: {
        "@type": "PostalAddress",
        streetAddress: leSignature.street,
        addressLocality: `${leSignature.neighborhood}, Brasília`,
        addressRegion: leSignature.region,
        postalCode: leSignature.postalCode,
        addressCountry: "BR",
      },
      sameAs: [site.instagram.url, leSignature.instagram.url],
      founder: { "@id": `${site.url}/#karen` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
