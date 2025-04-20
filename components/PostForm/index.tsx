// import Image from "next/image"
import { useUserInfo } from "@/hooks/useUserInfo"
import axios from "axios"
import { FormEvent, useState } from "react"
import Avatar from "../Avatar"

interface Props {
    onPost: () => void
}

const PostForm = ({ onPost }: Props) => {
    const {userInfo, status} = useUserInfo()
    const [text, setText] = useState('')

    const handlePostSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await axios.post('/api/posts', {text})
        setText('')
        // setImages([])
        
        if(onPost) onPost()
    }

    if (status === 'loading') return ''

    return (
        <form className="mx-5" onSubmit={handlePostSubmit}>
            <div className="flex">
                <div className="">
                    {userInfo?.image && <Avatar avatar={userInfo?.image} />}
                </div>
                <div className="grow pl-2">
                    <textarea className="w-full p-2 bg-transparent text-defaultWhite" value={text} onChange={(event) => setText(event.target.value)} placeholder={'What\'s happening?'} />
                    <div className="text-right border-t border-defaultBorder pt-2 pb-2">
                        <button className="bg-defaultBlue text-white px-5 py-1 rounded-full">
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostForm