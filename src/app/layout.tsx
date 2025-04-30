import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NaviGo",
  description: "Your Legal Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen transition-all duration-300 md:ml-[300px] lg:ml-[340px]">
          {children}
        </main>
      </body>
    </html>
  );
}
