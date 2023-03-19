import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prismadb'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { userId } = req.query
        if (!userId || typeof userId !== 'string') {
            return res.status(400).end()
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        const followerCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId,
                },
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}