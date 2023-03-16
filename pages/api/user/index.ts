import { prisma } from '@/lib/globalPrisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const userData = JSON.parse(req.body)

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
    })

    if (!user) {
      res.status(401).json({
        message: 'Error updating user',
      })
    }

    res.status(201).json(user)
  }
}
