import initMongoose from "@/lib/mongoose"
import Post from "@/models/Post"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await initMongoose()
    const session = await getServerSession(req, res, authOptions)

    if (req.method === 'POST') {
        const {text} = req.body

        const post = await Post.create({
            author: session?.user?.id,
            text
        })
        
        res.json(post)
    }
}

export default handler