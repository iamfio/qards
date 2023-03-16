import { prisma } from '@/lib/globalPrisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'PONG' })
  }

  if (req.method === 'POST') {
    const newQard = JSON.parse(req.body)

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
        message: 'Error CREATE Qard',
      })
    }

    res.status(201).json(qard)
  }

  if (req.method === 'PUT') {
    const existingQard = JSON.parse(req.body)

    console.log('Qard PUT /api/qard', existingQard)

    const qard = await prisma.qard.update({
      where: {
        id: existingQard.qardId,
      },
      data: {
        accountLink: existingQard.accountLink,
        accountName: existingQard.accountName,
      },
    })

    if (!qard) {
      res.status(401).json({
        message: 'Error UPDATE Qard',
      })
    }

    res.status(200).json(qard)
  }

  if (req.method === 'DELETE') {
    const qardId = JSON.parse(req.body)
    console.log(qardId)

    const response = await prisma.qard.delete({ where: { id: qardId } })

    if (!response) {
      res.status(401).json({
        message: 'Error DELETE Qard',
      })
    }

    res.status(200).json({
      message: 'QARD DELETED SUCESSFULLY',
      response,
    })
  }
}
