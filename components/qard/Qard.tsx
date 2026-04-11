"use client";

import { useQRCode } from "next-qrcode";
import { capitalize } from "@/lib/utils";
import { useTheme } from "@/components/theme/ThemeProvider";

import IconGeneric from "@/components/ui/icons/IconGeneric";

type QardProps = {
  id?: string;
  accountName: string;
  accountLink: string;
};

export default function Qard({ accountName, accountLink }: QardProps) {
  const { Canvas } = useQRCode();
  const { theme } = useTheme();

  return (
    <div className="my-6">
      <div className="shadow-xl card w-[350px] bg-base-100 ">
        <figure className="px-10 pt-10">
          <Canvas
            text={accountLink}
            options={{
              margin: 1,
              scale: 4,
              color: {
                dark: theme === "business" ? "#202020" : "#1f2937",
                light: "#fff",
              },
              errorCorrectionLevel: "H",
            }}
          />
        </figure>

        <div className="items-center text-center card-body">
          <div className="w-24 mb-2">
            <IconGeneric name={accountLink} />
          </div>
          <h2 className="mb-3 text-5xl card-title">
            <a href={accountLink}>{capitalize(accountName)}</a>
          </h2>
        </div>
      </div>
    </div>
  );
}
