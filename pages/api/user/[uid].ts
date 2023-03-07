import { prisma } from '@/lib/globalPrisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { uid } = req.query
    // console.log('UserID: ', uid)

    const user = await prisma.user.findUnique({
      where: {
        id: String(uid),
      },
      include: {
        qards: true,
      },
    })

    res.status(200).json(user)
  }
}
