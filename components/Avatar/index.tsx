interface Props {
    avatar: string
}

const Avatar = ({ avatar }: Props) => <div className="rounded-full overflow-hidden"><img src={ avatar } alt="avatar" /></div>

export default Avatar