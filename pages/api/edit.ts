import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/libs/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH') {
        res.status(405).end()
        return
    }

    try {
        const { currentUser } = await serverAuth(req)
        const { name, username, bio, profileImage, coverImage } = req.body
        if (!name || !username) {
            return res.status(400).end()
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        })
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}