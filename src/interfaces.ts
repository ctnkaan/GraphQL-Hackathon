export interface Ipost {
    id: number
    content: string
    reactions: {
        thumbsUp: number
        thumbsDown: number
        rocket: number
        heart: number
    }
    parentPost: number
    commentCount: number
    createdAt: string
    type: string
}

export interface Icomment {
    content: string
    postId: number
}
