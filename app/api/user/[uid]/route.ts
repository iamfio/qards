import { prisma } from '@/lib/globalPrisma'
import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: uid as string,
      },
      include: {
        qards: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching user' },
      { status: 500 }
    )
  }
}
