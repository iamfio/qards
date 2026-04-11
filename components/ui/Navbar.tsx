"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import AuthButton from "@/components/ui/AuthButton";
import Logo from "@/components/ui/Logo";
import SwitchTheme from "@/components/ui/SwitchTheme";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="shadow-md navbar bg-base-100">
      <div className="flex-1">
        <Logo />
      </div>

      <div className="flex-none gap-2">
        <SwitchTheme />

        {session?.user && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {session?.user.image && (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    unoptimized
                    className="rounded-full"
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard/profile/edit">
                  <span className="text-xl">Edit Profile</span>
                </Link>
              </li>

              <li>
                <a onClick={() => signOut()}>
                  <span className="text-xl">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        )}

        {!session?.user && <AuthButton />}
      </div>
    </div>
  );
}
