import type { Metadata } from "next";
import { Acme } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import QueryProvider from "@/providers/QueryProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import BurbuWhatsapp from "@/components/ui/WhtsppButton";

const acme = Acme({
  weight: "400",
  variable: "--font-acme",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpryUp - Sports & Outdoors",
  description: "Your one-stop shop for imported sports and outdoor gear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${acme.variable} antialiased`}>
        <BurbuWhatsapp />
        <I18nProvider>
          <QueryProvider>
            <Header />
            {children}
            <Footer />
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
