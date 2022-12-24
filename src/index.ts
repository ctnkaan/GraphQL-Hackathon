import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { Iinput, Icomment } from './interfaces'

const app = express()

const sampleData = {
    posts: [
        {
            id: 1,
            content: 'Welcome to learning GraphQL!',
            thumbsUp: 0,
            comments: [
                {
                    id: 1,
                    content: 'This is a comment',
                    thumbsUp: 0,
                    comments: [],
                },
            ],
        },
        {
            id: 2,
            content: 'This is a second post',
            thumbsUp: 0,
            comments: [
                {
                    id: 1,
                    content: 'This is a comment',
                    thumbsUp: 0,
                    comments: [],
                },
            ],
        },
    ],
}

const Schema = buildSchema(`#graphql
    
    input PostInput {
        content: String!
    }

    input CommentInput {
        content: String!
        postId: Int!
    }
    
    type Query {
        getAllPosts: [Post]
        getOnePost(id: Int): Post!
    }

    type Mutation {
        createPost(input: PostInput): Post
        createCommentForPost(comment: CommentInput): Comment
        changeVotePost(id: Int, vote: String): Post
    }


    type Post {
        id: Int!
        content: String!
        thumbsUp: Int
        comments: [Comment]
    }

    type Comment {
        id: Int
        content: String
        thumbsUp: Int
        comments: [Comment]
    }
`)

const Resolvers = {
    getAllPosts: () => sampleData.posts,

    getOnePost: ({ id }: { id: number }) =>
        sampleData.posts.find((post: any) => post.id === id),

    createPost: ({ input }: { input: Iinput }) => {
        const newPost = {
            id: sampleData.posts.length + 1,
            content: input.content,
            thumbsUp: 0,
            comments: [],
        }
        sampleData.posts.push(newPost)
        return newPost
    },

    createCommentForPost: ({ comment }: { comment: Icomment }) => {
        //find the post with the comment id
        const post = sampleData.posts.find(
            (post: any) => post.id === comment.postId
        )

        if (post === undefined)
            throw new Error('Post not found with id: ' + comment.postId)

        //create the comment
        const newComment = {
            id: post.comments.length + 1,
            content: comment.content,
            thumbsUp: 0,
            comments: [],
        }

        //add the comment to the post
        post.comments.push(newComment);
        return newComment;
    },

    changeVotePost: ({ id, vote }: { id: number, vote: string }) => {
        const post = sampleData.posts.find((post: any) => post.id === id)
        if (post === undefined) throw new Error('Post not found with id: ' + id)

        if (vote === 'up') post.thumbsUp++
        else if (vote === 'down') post.thumbsUp--
        else throw new Error('Vote must be up or down')

        return post
    }
}

app.use(
    '/graphql',
    graphqlHTTP({
        schema: Schema,
        rootValue: Resolvers,
        graphiql: true,
    })
)

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
