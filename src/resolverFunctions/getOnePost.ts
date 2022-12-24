import PostSchema_MongoDB from "../models/Schema.js"

export const getOnePost = async (id: number) => {
    const post = await PostSchema_MongoDB.findOne({ id: id })

    if (post === undefined) throw new Error("Post not found with id: " + id)

    return post
}
