import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { DocumentProvider } from "../context/DocumentContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NaviGo",
  description: "Your navigation solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DocumentProvider>{children}</DocumentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
