import ReactTimeAgo from "react-time-ago"
import Avatar from "../Avatar"
import Link from "next/link"

interface Props {
    text: string
    author: any
    createdAt: string
    _id: string
}

const PostContent = ({ text, author, createdAt, _id }: Props) => {
    console.log(author, 'author')

    return (
        <div className="flex">
            <div>
                <Avatar avatar={author?.image} />
            </div>
            <div className="pl-2">
                <div>
                    <span>
                        {author?.name}
                    </span>
                    <span className="pl-1 text-defaultLightGray">
                        @{author?.username}
                    </span>
                    <span className="pl-1 text-defaultLightGray">
                        <ReactTimeAgo date={createdAt} timeStyle={"twitter"} />
                    </span>
                </div>
                <Link href={`/${author?.username}/status/${_id}`}>
                    {text}
                </Link>
            </div>
        </div>
    )
}

export default PostContent