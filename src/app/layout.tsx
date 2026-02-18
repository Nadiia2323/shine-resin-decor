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
  title: {
    default: "Shine Resin Decor",
    template: "%s | Shine Resin Decor",
  },
  description:
    "Унікальні вироби з епоксидної смоли ручної роботи. Підставки, декор, індивідуальні замовлення.",
  keywords: [
    "епоксидна смола",
    "декор ручної роботи",
    "resin decor",
    "handmade",
    "годинники ручної роботи",
    "картини з епоксидної смоли",
  ],
  openGraph: {
    title: "Shine Resin Decor",
    description: "Авторські вироби з епоксидної смоли ручної роботи 💫",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
