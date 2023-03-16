import { prisma } from '@/lib/globalPrisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { uid } = req.query

    const user = await prisma.user.findUnique({
      where: {
        id: uid as string,
      },
      include: {
        qards: true,
      },
    })

    res.status(200).json(user)
  }
}
