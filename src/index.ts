import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const app = express()

const sampleData = {
    posts: [
        {
            id: 1,
            content: 'Welcome to learning GraphQL!',
            upvotes: 0,
            downvotes: 0,
            comments: [
                {
                    id: 1,
                    content: 'This is a comment',
                    upvotes: 0,
                    downvotes: 0,
                    comments: [],
                },
            ],
        },
        {
            id: 2,
            content: 'This is a second post',
            upvotes: 0,
            downvotes: 0,
            comments: [
                {
                    id: 1,
                    content: 'This is a comment',
                    upvotes: 0,
                    downvotes: 0,
                    comments: [],
                },
            ],
        },
    ],
}

const Schema = buildSchema(`#graphql
    type Query {
        getAllPosts: [Post],
        getOnePost(id: Int): Post!
    }

    type Mutation {
        # createPost mutation takes content as an input from the user. the id is posts.length + 1
        createPost(input: PostInput): Post
    }

    input PostInput {
        content: String!
    }



    type Post {
        id: Int!
        content: String!
        upvotes: Int
        downvotes: Int
        comments: [Comment]
    }

    type Comment {
        id: Int
        content: String
        upvotes: Int
        downvotes: Int
        comments: [Comment]
    }
`)

interface Iinput {
    content: string
}

const Resolvers = {
    getAllPosts: () => sampleData.posts,
    getOnePost: ({ id }: { id: number }) =>
        sampleData.posts.find((post: any) => post.id === id),
    createPost: ({ input }: { input: Iinput }) => {
        const newPost = {
            id: sampleData.posts.length + 1,
            content: input.content,
            upvotes: 0,
            downvotes: 0,
            comments: [],
        }
        sampleData.posts.push(newPost)
        return newPost
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
