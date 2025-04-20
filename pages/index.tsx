import PostContent from "@/components/PostContent"
import PostForm from "@/components/PostForm"
import UsernameForm from "@/components/UsernameForm"
import { useUserInfo } from "@/hooks/useUserInfo"
import axios from "axios"
import { useEffect, useState } from "react"

type Posts = {
    commentsCount: number
    createdAt: string
    images: string[]
    likesCount: number
    text: string
    updatedAt: string
    __v: number
    _id: string
}

const Home = () => {
    const {userInfo, status: userInfoStatus} = useUserInfo()
    const [posts, setPosts] = useState<Posts[]>([])

    const fetchHomePosts = () => {
        const posts = axios.get('/api/posts').then((posts) => setPosts(posts.data))
    }

    useEffect(() => fetchHomePosts(), [])

    if (userInfoStatus === 'loading') return 'loading user info'
    if (!userInfo?.name) return <UsernameForm />

    return (
        <div className="max-w-lg mx-auto border-l border-r border-defaultBorder min-h-screen">
            <h1 className="text-lg font-bold p-4">
                Home
            </h1>
            <PostForm onPost={() => fetchHomePosts()} />
            <div className="">
                {posts.length > 0 && posts.map((post) => <div className="border-t border-defaultBorder p-5"><PostContent text={post.text} author={userInfo} createdAt={post.createdAt} _id={post._id} /></div>)}
            </div>
        </div>
    )
}

export default Home