import GlowingDotsBackground from "@/components/bg/GlowingDotsBackground";
import ClientLoadingManager from "@/components/ClientLoadingManager";
import SideBar from "@/components/sidebar/SideBar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Montserrat, Poppins } from "next/font/google";
import React from "react";
import "./globals.css";

const LoadingOverlay = dynamic(() => import("@/components/ui/LoadingOverlay"), {
  ssr: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Angelo Santiago | Full Stack Developer & AI Automation Specialist",
  description:
    "Portfolio of Angelo Santiago - Software Developer specializing in AI-powered automation, full-stack development, and scalable solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${montserrat.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLoadingManager>
            <div className="flex min-h-screen flex-col">
              <div className="flex flex-1 gap-0">
                <SideBar />
                <main className="min-h-screen flex-1 px-4 py-2">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
          </ClientLoadingManager>
          <GlowingDotsBackground />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
