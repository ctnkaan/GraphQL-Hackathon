export interface Ipost {
    id: number
    content: string
    reactions: Ireactions
    comments: Ipost[]
    commentCount: number
    createdAt: string
}

interface Ireactions {
    thumbsUp: number
    thumbsDown: number
    rocket: number
    heart: number
}

export interface Icomment {
    content: string
    postId: number
}