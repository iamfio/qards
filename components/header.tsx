"use client"

import * as React from "react"
import Link from "next/link"
import { LogOut, Settings, User as UserIcon } from "lucide-react"
import type { User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item"
import { ModeToggle } from "@/components/mode-toggle"

// Mock user type - replace with your actual user type
// interface User {
//   name: string
//   email: string
//   image?: string
// }

// Mock auth state - replace with your actual auth logic
// const useMockAuth = () => {
//   const [user, setUser] = React.useState<User | null>(null)
//
//   // const login = () => {
//   //   setUser({
//   //     name: "John Doe",
//   //     email: "john@example.com",
//   //     image: "https://github.com/shadcn.png",
//   //   })
//   // }
//
//   const logout = () => {
//     setUser(null)
//   }
//
//   return { user, login, logout }
// }

export function Header() {
  // const { user, login, logout } = useMockAuth()
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight">Qards</span>
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline">Open</Button>}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={""} alt={""} />
                    <AvatarFallback>
                      User
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-56">
                <div className="p-1">
                  <Item size="xs">
                    <ItemMedia variant="image">
                      <Avatar size="sm">
                        <AvatarImage src={""} alt={""} />
                        <AvatarFallback>
                          USER
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>USERNAME</ItemTitle>
                      <ItemDescription>user@name.me</ItemDescription>
                    </ItemContent>
                  </Item>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <Item size="xs" className="cursor-pointer">
                    <ItemMedia variant="icon">
                      <UserIcon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Profile</ItemTitle>
                    </ItemContent>
                  </Item>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Item size="xs" className="cursor-pointer">
                    <ItemMedia variant="icon">
                      <Settings />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Settings</ItemTitle>
                    </ItemContent>
                  </Item>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => await signOut()} className="p-0">
                  <Item size="xs" className="cursor-pointer">
                    <ItemMedia variant="icon">
                      <LogOut />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Log out</ItemTitle>
                    </ItemContent>
                  </Item>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={async () => await signIn()}>Login / Register</Button>
          )}
        </div>
      </div>
    </header>
  )
}
