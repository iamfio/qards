import { prisma } from '@/lib/globalPrisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerAuthSession } from '../auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res })

  if (req.method === 'GET') {
    const qards = await prisma.user.findUnique({
      where: { id: session?.user.id as string },
      select: { qards: true },
    })

    if (!qards) {
      res.status(401).json({
        message: 'Error CREATE Qard',
      })
    }

    res.status(200).json(qards)
  }

  if (req.method === 'POST') {
    const newQard = JSON.parse(req.body)

    const qard = await prisma.user.update({
      where: {
        id: session?.user.id ?? '',
      },
      data: {
        qards: {
          create: {
            accountLink: newQard.accountLink,
            accountName: newQard.accountName,
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

    const qard = await prisma.user.update({
      where: {
        id: session?.user.id ?? '',
      },
      data: {
        qards: {
          update: {
            where: {
              id: existingQard.qardId ?? '',
            },
            data: {
              accountLink: existingQard.accountLink,
              accountName: existingQard.accountName,
            },
          },
        },
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

    const response = await prisma.user.update({
      where: {
        id: session?.user.id ?? '',
      },
      data: {
        qards: {
          delete: {
            id: qardId,
          },
        },
      },
    })

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
