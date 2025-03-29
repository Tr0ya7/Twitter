// import Image from "next/image"
import { useUserInfo } from "@/hooks/useUserInfo"
import axios from "axios"
import { FormEvent, useState } from "react"

const PostForm = () => {
    const {userInfo, status: userInfoStatus} = useUserInfo()
    const [text, setText] = useState('')

    if (userInfoStatus === 'loading') return ''

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const json = await axios.post('/api/posts', {text})
    }

    return (
        <form className="mx-5" onSubmit={() => handleSubmit}>
            <div className="flex">
                <div className="">
                    <div className="rounded-full overflow-hidden w-12">
                        <img src={userInfo?.image} alt="user image" />
                    </div>
                </div>
                <div className="grow pl-2">
                    <textarea className="w-full p-2 bg-transparent text-defaultWhite" value={text} onChange={(event) => setText(event.target.value)} placeholder={'What\'s happening?'} />
                    <div className="text-right border-t border-defaultBorder pt-2" />
                    <button className="bg-defaultBlue text-white px-5 py-1 rounded-full">
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PostForm