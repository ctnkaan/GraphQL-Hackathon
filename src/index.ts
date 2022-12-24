import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import moment from 'moment'
import { Iinput, Icomment } from './interfaces'

const app = express()

const db = {
    posts: [
        {
            id: 1,
            content: 'Welcome to learning GraphQL!',
            reactions: {
                thumbsUp: 0,
                thumbsDown: 0,
                rocket: 0,
                heart: 0,
            },
            comments: [
                {
                    id: 1,
                    content: 'This is a comment',
                    reactions: {
                        thumbsUp: 0,
                        thumbsDown: 0,
                        rocket: 0,
                        heart: 0,
                    },
                    comments: [],
                },
            ],
            commentCount: 1,
            createdAt: moment().fromNow()
        }
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
        reactions: Reactions
        comments: [Comment]
        commentCount: Int
        createdAt: String
    }

    type Comment {
        id: Int
        content: String
        reactions: Reactions
        comments: [Comment]
    }

    type Reactions {
        thumbsUp: Int
        thumbsDown: Int
        rocket: Int
        heart: Int
    }
`)

const Resolvers = {
    getAllPosts: () => db.posts,

    getOnePost: ({ id }: { id: number }) =>
        db.posts.find((post: any) => post.id === id),

    createPost: ({ input }: { input: Iinput }) => {
        const newPost = {
            id: db.posts.length + 1,
            content: input.content,
            reactions: {
                thumbsUp: 0,
                thumbsDown: 0,
                rocket: 0,
                heart: 0,
            },
            commentCount: 0,
            comments: [],
            createdAt: moment().fromNow()
        }
        db.posts.push(newPost)
        return newPost
    },

    createCommentForPost: ({ comment }: { comment: Icomment }) => {
        //find the post with the comment id
        const post = db.posts.find(
            (post: any) => post.id === comment.postId
        )

        if (post === undefined)
            throw new Error('Post not found with id: ' + comment.postId)

        //create the comment
        const newComment = {
            id: post.comments.length + 1,
            content: comment.content,
            reactions: {
                thumbsUp: 0,
                thumbsDown: 0,
                rocket: 0,
                heart: 0,
            },
            comments: [],
        }

        //add the comment to the post
        post.comments.push(newComment);

        //update the comment count
        post.commentCount = post.comments.length;

        return newComment;
    },

    changeVotePost: ({ id, vote }: { id: number, vote: string }) => {
        const post = db.posts.find((post: any) => post.id === id)
        
        if (post === undefined) throw new Error('Post not found with id: ' + id)

        switch (vote) {
            case 'up':
                post.reactions.thumbsUp++
                break
            case 'down':
                post.reactions.thumbsUp--
                break
            case "rocket":
                post.reactions.rocket++
                break
            case "heart":
                post.reactions.heart++
                break
            default:
                throw new Error('Vote must be up, down, rocket or heart')
        }

        return post
    },

    
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
