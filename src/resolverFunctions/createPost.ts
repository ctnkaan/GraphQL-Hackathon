import { Ipost } from '../interfaces.js'
import PostSchema_MongoDB from '../models/Schema.js'
import { randomIdGenerator } from '../util/randomIdGenerator.js'
import moment from 'moment'

export const createPost = async (post: Ipost) => {
    if (post.content.length > 280) {
        throw new Error(
            'You cannot send a post which has more than 280 characters'
        )
    }

    const newPost = new PostSchema_MongoDB({
        id: randomIdGenerator(),
        content: post.content,
        reactions: {
            thumbsUp: 0,
            thumbsDown: 0,
            rocket: 0,
            heart: 0,
        },
        parentPost: 0,
        commentCount: 0,
        paaremntPost: null,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        type: 'post',
    })

    await newPost.save()

    console.log('Post created')

    return newPost
}
