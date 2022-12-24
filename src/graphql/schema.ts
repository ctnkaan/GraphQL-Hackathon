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
        getAllComments: [Post]
        getOnePost(id: Int): Post
        getOneComment(id: Int): Post
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
        parentPost: Int
        commentCount: Int
        createdAt: String
        type: String
    }

    type Reactions {
        thumbsUp: Int
        thumbsDown: Int
        rocket: Int
        heart: Int
    }
`)
