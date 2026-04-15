"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, User as UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const initials = getUserInitials(session?.user?.name, session?.user?.email);

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
                  <Avatar className="size-10">
                    {session.user.image && (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name || "User Avatar"}
                      />
                    )}
                    <AvatarFallback>
                      {initials || (
                        <UserIcon className="size-5 text-muted-foreground" />
                      )}
                    </AvatarFallback>
                  </Avatar>
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
