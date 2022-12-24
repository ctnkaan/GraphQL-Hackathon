import { buildSchema } from 'graphql'

export const Schema = buildSchema(`#graphql
    
    input PostInput {
        content: String
    }

    input CommentInput {
        content: String
        postId: Int
    }
    
    type Query {
        getAllPosts: [Post]
        getOnePost(id: Int): Post
    }

    type Mutation {
        createPost(post: PostInput): Post
        createComment(comment: CommentInput): Post
        updateReaction(id: Int, vote: String): Post
    }


    type Post {
        id: Int
        content: String
        reactions: Reactions
        comments: [Post]
        commentCount: Int
        createdAt: String
    }

    type Reactions {
        thumbsUp: Int
        thumbsDown: Int
        rocket: Int
        heart: Int
    }
`)
