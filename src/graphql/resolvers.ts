import { Ipost, Icomment } from '../interfaces.js'

import { getAllPosts } from '../resolverFunctions/getAllPosts.js'
import { createPost } from '../resolverFunctions/createPost.js'
import { createComment } from '../resolverFunctions/createComment.js'
import { updateReaction } from '../resolverFunctions/updateReaction.js'
import { getAllComments } from '../resolverFunctions/getAllComments.js'
import { getOnePost } from '../resolverFunctions/getOnePost.js'
import { getOneComment } from '../resolverFunctions/getOneComment.js'

export const Resolvers = {
    getAllPosts: () => {
        return getAllPosts()
    },

    getOnePost: ({ id }: { id: number }) => {
        return getOnePost(id)
    },

    getOneComment: ({ id }: { id: number }) => {
        return getOneComment(id)
    },

    getAllComments: () => {
        return getAllComments()
    },

    createPost: ({ post }: { post: Ipost }) => {
        return createPost(post)
    },

    createComment: ({ comment }: { comment: Icomment }) => {
        return createComment(comment)
    },

    updateReaction: ({ id, vote }: { id: number; vote: string }) => {
        return updateReaction(id, vote)
    },
}
