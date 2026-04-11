import { prisma } from "@/lib/globalPrisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileEditForm from "./ProfileEditForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qards | Edit Profile",
};

async function getUserById(userId: User["id"]) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await getUserById(session.user.id as string);

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <div className="w-full my-8">
        <ProfileEditForm user={user} />
      </div>
    </div>
  );
}
