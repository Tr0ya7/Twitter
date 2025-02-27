import { ClientSafeProvider, getProviders, signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"

interface LoginProps {
    providers: Record<string, ClientSafeProvider>
}

const Login = ({ providers }: LoginProps) => {
    const {data, status} = useSession()
    const router = useRouter()

    if (status === 'loading') return ''
    if (data) router.push('/')
    
    return (
        <div className="flex items-center justify-center h-screen">
            {Object.values(providers).map(provider => (
                <div>
                    <button className="bg-defaultWhite pl-3 pr-5 py-2 text-black rounded-full flex items-center gap-x-2" onClick={async () => { await signIn(provider.id) }}>
                        <Image src="/google.svg" width={20} height={20} alt="google" />
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login

export async function getServerSideProps() { 
    const providers = await getProviders()
    return {
        props: { providers }
    }
}