import PostSchema_MongoDB from '../models/Schema.js'

export const getAllComments = async () => {
    const comments = await PostSchema_MongoDB.find(
        {
            type: 'comment',
        },
    )
    console.log(comments)
    return comments
}
