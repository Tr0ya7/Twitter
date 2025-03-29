import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface User {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
}

export const useUserInfo = () => {
    const { data: session, status: sessionStatus } = useSession()

    const [userInfo, setUserInfo] = useState<User | null>(null)
    const [status, setStatus] = useState<string>('loading')

    const getUserInfo = () => {
        if (sessionStatus === 'loading') return

        if (!session?.user?.id) {
            setStatus("error")
            return console.warn("ID do usuário não encontrado na sessão!")
        }

        fetch(`/api/users?id=${session.user.id}`)
            .then((response) => response.json()
            .then((json) => {
                setUserInfo(json.user)
                setStatus('done')
            }))
    }

    useEffect(() => {
        getUserInfo()
    }, [sessionStatus])

    return { userInfo, status }
}