import { prisma } from "@/lib/globalPrisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userData = await req.json();

    if (userData.id !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        name: userData.name,
        username: userData.username,
        company: userData.company,
        jobRole: userData.jobRole,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 },
    );
  }
}
