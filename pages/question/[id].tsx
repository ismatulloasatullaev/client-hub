import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import type { NextPage } from "next"

import { PostView } from "modules/PostView"
import type { Post } from "shared/types"
import { QUESTION } from "services/api"

const Article: NextPage = () => {
    const [post, setPost] = useState<Post>()
    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
        if (id) {
            QUESTION.getFull(id as string).then((res) => {
                setPost(res.data)
            })
        }
    }, [id])

    return <>{post && <PostView post={post} />}</>
}

export default Article
