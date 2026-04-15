import { Suspense } from "react";
import type { Metadata } from "next";

import ProfileCard from "@/components/profile/ProfileCard";
import Qard from "@/components/qard/Qard";
import UserNotFound from "@/components/ui/UserNotFound";
import { prisma } from "@/lib/globalPrisma";
import type { User } from "@prisma/client";

import Loading from "./loading";
import QardEmptyList from "@/components/qard/QardEmptyList";

type UserPageProps = {
  params: Promise<{ username: string }>;
};

async function getUserByUsername(username: User["username"]) {
  if (!username) {
    return null;
  }

  return prisma.user.findUnique({
    where: { username },
    include: {
      qards: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);
  return { title: `${user?.name}'s Qards` };
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <div className="my-8">
      <div className="snap-mandatory snap-always snap-y">
        <div className="snap-start">
          <Suspense fallback={<Loading />}>
            <ProfileCard user={user} />

            <div className="divider my-14"></div>

            {user?.qards.map((qard) => (
              <Qard
                accountLink={qard.accountLink}
                accountName={qard.accountName}
                id={qard.id}
                key={qard.id}
              />
            ))}
          </Suspense>

          {user.qards.length === 0 && <QardEmptyList />}
        </div>
      </div>
    </div>
  );
}
