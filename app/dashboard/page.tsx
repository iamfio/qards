import QardList from "@/components/qard/QardList";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import Loading from "./loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qards | Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  if (!session.user.username) {
    redirect("/dashboard/profile/edit");
  }

  return (
    <>
      <div className="w-full my-8 sm:w-96">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            Hello{" "}
            <Link
              href={encodeURIComponent(session.user.username)}
              className="underline underline-offset-2"
            >
              {session.user.name}
            </Link>{" "}
            👋
          </h1>

          <div className="divider"></div>
        </div>

        <Suspense fallback={<Loading />}>
          <QardList />
        </Suspense>
      </div>
    </>
  );
}
