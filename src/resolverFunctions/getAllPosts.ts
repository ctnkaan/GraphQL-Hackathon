import PostSchema_MongoDB from '../models/Schema.js'

export const getAllPosts = async () => {
    const posts = await PostSchema_MongoDB.find(
        {
            type: 'post',
        },
    )
    console.log(posts)
    return posts
}
