import PostSchema_MongoDB from '../../models/Schema.js'


export const getAllPosts = async () => {
        //clean all the posts
        const posts = await PostSchema_MongoDB.find()
        console.log(posts)
        return posts
}