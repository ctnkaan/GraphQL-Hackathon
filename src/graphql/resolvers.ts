import moment from 'moment'
import { Ipost, Icomment } from '../interfaces.js'

import PostSchema_MongoDB from '../models/Schema.js'
import { randomIdGenerator } from '../util/randomIdGenerator.js'

import { getAllPosts } from './resolverFunctions/getAllPosts.js'
import { createPost } from './resolverFunctions/createPost.js'
import { createComment } from './resolverFunctions/createComment.js'
import { updateReaction } from './resolverFunctions/updateReaction.js'

export const Resolvers = {
    getAllPosts: () => {
        return getAllPosts()
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
