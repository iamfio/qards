"use client";

import { useEffect, useRef, useState } from "react";
import { getURL } from "@/lib/utils/strings";
import type { Qard, User } from "@prisma/client";
import { useQRCode } from "next-qrcode";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ProfileCardProps = {
  user: (User & { qards: Qard[] }) | null;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  const { Canvas } = useQRCode();
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [qrSize, setQrSize] = useState(200);

  useEffect(() => {
    const element = qrContainerRef.current;

    if (!element) {
      return;
    }

    const updateSize = () => {
      const next = Math.max(
        150,
        Math.min(260, Math.floor(element.clientWidth - 24)),
      );
      setQrSize(next);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Card className="w-[min(100%,420px)] shadow-xl">
      <div>
        {user?.image && (
          <Image
            src={user.image}
            alt={user?.name || "Profile Picture"}
            width={350}
            height={350}
            unoptimized
            className="w-full rounded-t-xl object-cover"
          />
        )}
      </div>

      <CardHeader className="gap-0">
        <CardTitle>{user?.name}</CardTitle>

        {user?.jobRole && (
          <p className="mt-1 text-sm font-mono text-muted-foreground">
            {user?.jobRole}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {user?.email && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              E-Mail
            </p>
            <p className="text-base">{user?.email}</p>
          </div>
        )}

        {user?.company && (
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Company
            </p>
            <p className="text-base">{user?.company}</p>
          </div>
        )}

        <Separator className="my-2" />

        <div
          ref={qrContainerRef}
          className="flex w-full justify-center"
        >
          <Canvas
            text={getURL(`/${user?.username}`)}
            options={{
              margin: 1,
              width: qrSize,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
