import { useUserInfo } from "@/hooks/useUserInfo"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UsernameForm = () => {
    const {userInfo, status} = useUserInfo()
    
    const [username, setUsername] = useState<string | undefined>('')

    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return
        if (username === '') {
            const defaultUsername = userInfo?.email?.split('@')[0]
            setUsername(defaultUsername?.replace(/[^a-z]+/gi, ''))
        }
    }, [status])

    if (status === 'loading') return ''

    return (
        <div className="flex h-screen items-center justify-center">
            <form 
                className="text-center" 
                onSubmit={async (event) => { event.preventDefault(); await fetch('/api/users', { method: 'PUT', headers: {'content-type':'application/json'}, body: JSON.stringify({username}) }); router.reload() }}
            >
                <h1 className="text-xl">
                    Pick a username
                </h1>
                <input type="text" className="block mb-1 bg-defaultBorder px-3 py-1 rounded-full" value={username} placeholder={'username'} onChange={(event) => setUsername(event.target.value)} />
                <button className="block bg-defaultBlue w-full rounded-full py-1">
                    Continue
                </button>
            </form>
        </div>
    )
}

export default UsernameForm