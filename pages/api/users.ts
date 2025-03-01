import initMongoose from "@/lib/mongoose"
import User from "@/models/user"
import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerProps } from "next/dist/build/templates/pages"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // await initMongoose()

    // if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" })

    // const { id } = req.query

    // if (!id || Array.isArray(id)) return res.status(400).json({ error: "ID não fornecido ou inválido" })

    // try {
    //     const user = await User.findById(id)

    //     if (!user)return res.status(404).json({ error: "Usuário não encontrado" })

    //     res.status(200).json({ user })
    // } catch (error) {
    //     console.error("Erro ao buscar usuário:", error)
    //     res.status(500).json({ error: "Erro interno ao buscar usuário" })
    // }

    await initMongoose()
    const session = await unstable_getServerProps(req, res, authOptions)

    if (req.method === 'PUT') {
        const {username} = req.body

        await User.findByIdAndUpdate(session.user.id, {username:username})
        res.json('ok')
    }

    if (req.method === 'GET') {
        const id = req.query.id
        const user = await User.findById(id)

        res.json({user})
    }
}