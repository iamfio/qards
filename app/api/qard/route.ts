import { prisma } from "@/lib/globalPrisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Qard, User } from '@prisma/client'

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: String(session.user.id) },
    include: {
      qards: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Error GET Qards" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const newQard = await req.json();

  const data = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { qards: true },
  });

  if (!data) {
    return NextResponse.json(
      { message: "Error CREATE Qard - User not found" },
      { status: 404 },
    );
  }

  const position = data.qards?.length > 0 ? data.qards.length + 1 : 0;

  const userWithNewQard = await prisma.user.update({
    where: {
      id: String(session.user.id),
    },
    data: {
      qards: {
        create: {
          accountLink: newQard.accountLink,
          accountName: newQard.accountName,
          position,
        },
      },
    },
  });

  if (!userWithNewQard) {
    return NextResponse.json({ message: "Error CREATE Qard" }, { status: 500 });
  }

  return NextResponse.json(userWithNewQard, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const existingQard = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: String(session.user.id),
      },
      data: {
        qards: {
          update: {
            where: {
              id: String(existingQard.qardId),
            },
            data: {
              accountLink: existingQard.accountLink,
              accountName: existingQard.accountName,
            },
          },
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error UPDATE Qard" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const existingQard: Qard = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: String(session.user.id),
      },
      data: {
        qards: {
          update: {
            where: {
              id: existingQard.id,
            },
            data: {
              position: existingQard.position,
            },
          },
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error UPDATE Qard Position" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const qardId = await req.json();

  try {
    const response = await prisma.user.update({
      where: {
        id: String(session.user.id),
      },
      data: {
        qards: {
          delete: {
            id: qardId,
          },
        },
      },
    });

    return NextResponse.json({
      message: "QARD DELETED SUCCESSFULLY",
      response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error DELETE Qard" }, { status: 500 });
  }
}
