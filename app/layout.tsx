import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hello World! - Ilham Alfath",
  description:
    "Hi, I'm Ilham Alfath. This domain is dedicated to my assignments and final projects. Welcome to my personal space on the web!",
  authors: [{ name: "Ilham Alfath", url: "https://xpqx.xyz" }],
  openGraph: {
    title: "Hello World! - Ilham Alfath",
    description:
      "Hi, I'm Ilham Alfath. This domain is dedicated to my assignments and final projects. Welcome to my personal space on the web!",
    url: "https://xpqx.xyz",
    siteName: "Ilham Alfath's Website",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
