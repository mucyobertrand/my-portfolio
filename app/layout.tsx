import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { PreloadProvider } from "@/components/PreloadContext";
import { site } from "@/lib/data";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Web & Mobile, Backend & Applied AI Engineer`,
    template: `%s | ${site.name}`,
  },
  description:
    "Web & mobile engineer, backend engineer and applied AI engineer in Kigali, Rwanda. Product Lead at Entelon and Developer & Researcher at IWP Africa.",
  openGraph: {
    title: `${site.name} | Web & Mobile, Backend & Applied AI Engineer`,
    description: "Building AI products, digital health tools and community-first software from Kigali, Rwanda.",
    images: ["/img/me.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#131313" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <PreloadProvider>
          <SmoothScroll />
          <Preloader />
          <Nav />
          <aside className="side-tab" aria-hidden="true">
            <span className="side-tab-dot" />
            <span>Kigali · RW</span>
          </aside>
          <Cursor />
          <main id="main">{children}</main>
        </PreloadProvider>
      </body>
    </html>
  );
}
