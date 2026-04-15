"use client";

import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session && (
        <div>
          <Button
            onClick={async () => {
              await signIn();
            }}
            size="sm"
            variant="outline"
          >
            SIGN IN / SIGN UP
          </Button>
        </div>
      )}
    </div>
  );
}
