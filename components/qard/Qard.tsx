"use client";

import * as React from "react";
import { useQRCode } from "next-qrcode";
import { capitalize } from "@/lib/utils/strings";
import { useTheme } from "@/components/theme/ThemeProvider";

import IconGeneric from "@/components/ui/icons/IconGeneric";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type QardProps = {
  id?: string;
  accountName: string;
  accountLink: string;
};

export default function Qard({ accountName, accountLink }: QardProps) {
  const { Canvas } = useQRCode();
  const { theme } = useTheme();
  const qrContainerRef = React.useRef<HTMLDivElement>(null);
  const [qrSize, setQrSize] = React.useState(240);

  React.useEffect(() => {
    const element = qrContainerRef.current;

    if (!element) {
      return;
    }

    const updateSize = () => {
      const next = Math.max(
        160,
        Math.min(320, Math.floor(element.clientWidth - 24)),
      );
      setQrSize(next);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-6 w-full px-2 sm:px-0">
      <Card className="mx-auto w-full max-w-[420px] shadow-xl">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <div
            ref={qrContainerRef}
            className="w-full max-w-[340px] rounded-lg border bg-background p-3"
          >
            <Canvas
              text={accountLink}
              options={{
                margin: 1,
                width: qrSize,
                color: {
                  dark: theme === "black" ? "#000000" : "#1f2937",
                  light: "#fff",
                },
                errorCorrectionLevel: "H",
              }}
            />
          </div>

          <Separator />

          <div className="flex flex-col items-center text-center">
            <div className="mb-2 w-24">
              <IconGeneric name={accountLink} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              <a
                href={accountLink}
                className="hover:underline"
              >
                {capitalize(accountName)}
              </a>
            </h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
