import Navbar from "@/components/Navbar";
import { RootStoreProvider } from "@/context/RootStoreContext";
import "@styles/base.scss";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-Commerce KTS",
  description: "Internet Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={roboto.className}>
        <RootStoreProvider>
          <Navbar></Navbar>
          {children}
        </RootStoreProvider>
      </body>
    </html>
  );
}
