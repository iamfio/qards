"use client";

import { getURL } from "@/lib/utils";
import { Qard, User } from "@prisma/client";
import { useQRCode } from "next-qrcode";
import { useTheme } from "@/components/theme/ThemeProvider";
import Image from "next/image";

type ProfileCardProps = {
  user: (User & { qards: Qard[] }) | null;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  const { Canvas } = useQRCode();
  const { theme } = useTheme();

  return (
    <div className="card w-[350px] bg-base-100 shadow-xl">
      <figure>
        {user?.image && (
          <Image
            src={user.image}
            alt={user?.name || "Profile Picture"}
            width={350}
            height={350}
            unoptimized
          />
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">{user?.name}</h2>

        {user?.jobRole && (
          <h2 className="mt-[-0.4rem] mb-2 text-sm font-mono">
            {user?.jobRole}
          </h2>
        )}

        {user?.email && (
          <div>
            <div className="mt-2 text-sm font-bold">E-Mail:</div>{" "}
            <span className="text-lg">{user?.email}</span>
          </div>
        )}

        {user?.company && (
          <div>
            <div className="mt-2 text-sm font-bold">Company:</div>{" "}
            <span className="text-lg">{user?.company}</span>
          </div>
        )}

        <div className="divider"></div>

        <div className="self-center">
          <Canvas
            text={getURL(`/${user?.username}`)}
            options={{
              margin: 1,
              scale: 3,
              width: 200,
              color: {
                light: "#fff",
                dark: theme === "business" ? "#202020" : "#1f2937",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
