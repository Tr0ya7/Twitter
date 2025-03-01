import UsernameForm from "@/components/UsernameForm"
import { useUserInfo } from "@/hooks/useUserInfo"

const Home = () => {
    const {userInfo, status: userInfoStatus} = useUserInfo()

    if (userInfoStatus === 'loading') return 'loading user info'
    if (!userInfo?.name) return <UsernameForm />

    return <div>Homepage logged in {userInfo.name}</div>
}

export default Home