import "./globals.css";

import AuthContext from "@/components/AuthContext";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Urbanist, Oxanium } from "next/font/google";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const oxanium = Oxanium({subsets:['latin'],variable:'--font-sans'});

const urbanist = Urbanist({ subsets: ["latin"] });

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
      className={cn("font-sans", oxanium.variable)}
    >
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <title>Qards</title>
      </head>
      <body className={urbanist.className}>
        <AuthContext session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex flex-col items-center justify-center mx-8 sm:mx-4">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
