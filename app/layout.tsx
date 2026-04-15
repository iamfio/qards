import "./globals.css";

import AuthContext from "@/components/AuthContext";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Urbanist, Oxanium } from "next/font/google";
import type { Metadata } from "next";
import { Header } from "@/components/header";

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
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthContext session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="mx-8 flex flex-col items-center justify-center sm:mx-4">
                {children}
              </div>
            </div>
            <Footer />
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
