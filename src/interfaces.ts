export interface Ipost {
    id: number
    content: string
    reactions: {
        thumbsUp: number
        thumbsDown: number
        rocket: number
        heart: number
    }
    comments: Ipost[]
    commentCount: number
    createdAt: string
}

export interface Icomment {
    content: string
    postId: number
}
