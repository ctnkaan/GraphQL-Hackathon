import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
        thumbsUp: {
            type: Number,
        },
        thumbsDown: {
            type: Number,
        },
        rocket: {
            type: Number,
        },
        heart: {
            type: Number,
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
});

const PostSchema_MongoDB = mongoose.model("Post", PostSchema);

export default PostSchema_MongoDB;
