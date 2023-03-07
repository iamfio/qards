import { prisma } from '@/lib/globalPrisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'PONG' })
  }

  if (req.method === 'POST') {
    const newQard = JSON.parse(req.body)

    // 1. Creates new Qard and connects to User
    const qard = await prisma.qard.create({
      data: {
        accountName: newQard.accountName,
        accountLink: newQard.accountLink,
        user: {
          connect: {
            id: newQard.userId,
          },
        },
      },
    })

    if (!qard) {
      res.status(401).json({
        message: 'Error creating new Qard',
      })
    }

    res.status(201).json(qard)
  }
}
