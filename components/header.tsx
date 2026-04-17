"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { getUserInitials } from "@/lib/utils/avatar";

export function Header() {
  const { data: session } = useSession();
  const [liveAvatarUrl, setLiveAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    function onAvatarUpdated(event: Event) {
      const customEvent = event as CustomEvent<{ url?: string }>;
      if (customEvent.detail?.url) {
        setLiveAvatarUrl(customEvent.detail.url);
      }
    }

    window.addEventListener("avatar-updated", onAvatarUpdated);

    return () => {
      window.removeEventListener("avatar-updated", onAvatarUpdated);
    };
  }, []);

  const initials = getUserInitials(session?.user?.name, session?.user?.email);
  const avatarSrc = liveAvatarUrl ?? session?.user?.image ?? null;
  const avatarAlt = session?.user?.name || "User Avatar";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center"
        >
          <span className="text-xl font-bold tracking-tight">Qards</span>
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative size-10 rounded-full"
                >
                  <div className="relative size-10 overflow-hidden rounded-full border bg-muted">
                    {avatarSrc ? (
                      <Image
                        src={avatarSrc}
                        alt={avatarAlt}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
                        {initials || (
                          <UserIcon className="size-5 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile/edit">
                    <UserIcon className="mr-2 size-4" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>Sign In / Sign Up</Button>
          )}
        </div>
      </div>
    </header>
  );
}
