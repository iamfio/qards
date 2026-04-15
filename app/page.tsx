import QCookieConsent from "@/components/ui/cookie-consent/QCookieConsent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Qards - Your Digital Business Card",
  description: "Create and manage all your social profiles and projects with a single QR code. Share your digital business card effortlessly.",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  const featureItems = [
    {
      value: "signUp",
      trigger: "1. Sign Up Instantly",
      content:
        "Create your account in seconds using your favorite social login. No extra passwords to remember.",
    },
    {
      value: "createCard",
      trigger: "2. Create Your Qards",
      content:
        "Add links to your social media profiles, projects, websites, or any online presence you have. Each link becomes a 'Qard' on your profile.",
    },
    {
      value: "enjoy",
      trigger: "3. Share with a Scan",
      content:
        "Share all your links with a single QR code. Perfect for networking events, conferences, or everyday interactions.",
    },
  ];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
      <div className="mb-12">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">Qards</h1>
        <h2 className="text-2xl text-muted-foreground">
          One QR Code for All Your Links.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg">
          Effortlessly manage and share your digital presence. Create a personal
          QR business card for all your social profiles and projects. Just create a Qard and let your partners scan it.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-lg mx-auto"
        defaultValue="signUp"
      >
        {featureItems.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
          >
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent className="text-left">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <QCookieConsent />
    </div>
  );
}
