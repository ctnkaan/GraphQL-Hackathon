import { Icomment } from '../interfaces.js'
import PostSchema_MongoDB from '../models/Schema.js'
import { randomIdGenerator } from '../util/randomIdGenerator.js'
import moment from 'moment'

export const createComment = async (comment: Icomment) => {
    //find the post with the comment id
    const post = await PostSchema_MongoDB.findOne({ id: comment.postId })


    if (post === undefined)
        throw new Error('Post not found with id: ' + comment.postId)

    //create a new comment
    const newComment = new PostSchema_MongoDB({
        id: randomIdGenerator(),
        content: comment.content,
        parentPost: comment.postId,
        reactions: {
            thumbsUp: 0,
            thumbsDown: 0,
            rocket: 0,
            heart: 0,
        },
        commentCount: 0,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        type: 'comment',
    })

    newComment.save()

    console.log('Comment created')
    console.log(newComment)

    return newComment
}
