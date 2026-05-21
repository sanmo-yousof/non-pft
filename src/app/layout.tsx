import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SettingsWrapper } from "@/wrappers/SettingsWrapper";
import Header from "@/components/shared/Header";
import { Toaster } from "sonner";
import AuthProvider from "@/context/AuthContext";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Kenya Challenge | Walk for Education",
  description: "The Kenya Challenge | Walk for Education",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        <Providers>
          <AuthProvider>
            <SettingsWrapper>
              <Header />
              {children}
              <Toaster />
            </SettingsWrapper>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
