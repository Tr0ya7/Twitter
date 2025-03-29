import PostForm from "@/components/PostForm"
import UsernameForm from "@/components/UsernameForm"
import { useUserInfo } from "@/hooks/useUserInfo"

const Home = () => {
    const {userInfo, status: userInfoStatus} = useUserInfo()

    if (userInfoStatus === 'loading') return 'loading user info'
    if (!userInfo?.name) return <UsernameForm />

    return <div className="max-w-lg mx-auto border-l border-r border-defaultBorder min-h-screen"><h1 className="text-lg font-bold p-4">Home</h1><PostForm /></div>
}

export default Home