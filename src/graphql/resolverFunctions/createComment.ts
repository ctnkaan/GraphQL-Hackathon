import { Icomment } from '../../interfaces.js'
import PostSchema_MongoDB from '../../models/Schema.js'
import { randomIdGenerator } from '../../util/randomIdGenerator.js'
import moment from 'moment'

export const createComment = async (comment: Icomment) => {
    //find the post with the comment id
    const post = await PostSchema_MongoDB.find(
        (post: any) => post.id === comment.postId
    )

    if (post === undefined)
        throw new Error('Post not found with id: ' + comment.postId)

    //create the comment
    const newComment = {
        id: randomIdGenerator(),
        content: comment.content,
        reactions: {
            thumbsUp: 0,
            thumbsDown: 0,
            rocket: 0,
            heart: 0,
        },
        comments: [],
        commentCount: 0,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    }

    return newComment
}
