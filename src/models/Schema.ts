import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    reactions: {
        type: Object,
        required: true,
        thumbsUp: {
            type: Number,
            required: true,
        },
        thumbsDown: {
            type: Number,
            required: true,
        },
        rocket: {
            type: Number,
            required: true,
        },
        heart: {
            type: Number,
            required: true,
        },
    },
    comments: {
        type: Array,
    },
    commentCount: {
        type: Number,
    },
    createdAt: {
        type: String,
    },
})

const PostSchema_MongoDB = mongoose.model('Post', PostSchema, 'posts')

export default PostSchema_MongoDB
