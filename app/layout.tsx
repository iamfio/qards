import "./globals.css";

import AuthContext from "@/components/AuthContext";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Oxanium } from "next/font/google";
import React from "react";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Qards",
  description: "Advanced dynamic theme management in Next.js 16",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={oxanium.variable}
    >
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <title>Qards</title>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContext session={session}>
            <Header />
            <main className="grow mx-8 flex flex-col items-center justify-center sm:mx-4">
              {children}
            </main>
            <Footer />
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
