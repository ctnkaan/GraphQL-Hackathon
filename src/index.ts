import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import moment from 'moment'
import mongoose from 'mongoose'

import { Ipost, Icomment } from './interfaces.js'
import PostSchema_MongoDB from './models/Schema.js'

const app = express()

const IDs = [] as number[];

const randomIdGenerator = () => {
    let randomId = 0;
    do {
        randomId = Math.floor(Math.random() * 1000);
    } while (IDs.includes(randomId));

    IDs.push(randomId);

    return randomId;
}

//connect to mongodb
mongoose.connect('mongodb://localhost:27017', () => {
    console.log('Connected to MongoDB')
})

//create a post
const createPost = async (post: Ipost) => {
    const newPost = new PostSchema_MongoDB({
        id: randomIdGenerator(),
        content: post.content,
        reactions: {
            thumbsUp: 0,
            thumbsDown: 0,
            rocket: 0,
            heart: 0,
        },
        commentCount: 0,
        comments: [],
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    })

    await newPost.save()

    console.log('Post created')

    return newPost
};

const createComment = async (comment: Icomment) => {
    //find the post with the comment id
    const post = await PostSchema_MongoDB.find(
        (post: any) => post.id === comment.postId
    )

    if (post === undefined)
        throw new Error('Post not found with id: ' + comment.postId)

    //create a new comment for the post of the provided id

    const newComment = {
        id: randomIdGenerator(),
        content: comment.content,
        reactions: {
            thumbsUp: 0,
            thumbsDown: 0,
            rocket: 0,
            heart: 0,
        },
        comments: [],
        commentCount: 0,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    }

    //add the comment to the post

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
        getOnePost(id: Int): Post
    }

    type Mutation {
        createPost(post: PostInput): Post
        createComment(comment: CommentInput): Post
        changeVotePost(id: Int, vote: String): Post
    }


    type Post {
        id: Int!
        content: String!
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

const Resolvers = {
    getAllPosts: async () => {
        //clean all the posts
        const posts = await PostSchema_MongoDB.find()
        console.log(posts)
        return posts
    },

    /*getOnePost: async ({ id }: { id: number }) => {
        const post = await PostSchema_MongoDB.find((post: Ipost) => post.id === id)

        if (post === undefined)
            throw new Error('Post not found with id: ' + id)

        return post
    },*/

    createPost: async ({ post }: { post: Ipost }) => {

        if (post.content.length > 280) {
            throw new Error('You cannot send a post which has more than 280 characters')
        }
        
        return createPost(post);
    },

    createComment: async ({ comment }: { comment: Icomment }) => {
        //find the post with the comment id
        const post = await PostSchema_MongoDB.find(
            (post: any) => post.id === comment.postId
        )

        if (post === undefined)
            throw new Error('Post not found with id: ' + comment.postId)

        //create the comment
        const newComment = {
            id: randomIdGenerator(),
            content: comment.content,
            reactions: {
                thumbsUp: 0,
                thumbsDown: 0,
                rocket: 0,
                heart: 0,
            },
            comments: [],
            commentCount: 0,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
        }

        console.log(post)


        return newComment;
    },

    changeVotePost: ({ id, vote }: { id: number, vote: string }) => {
        /*const post = PostSchema_MongoDB.find((post: Ipost) => post.id === id)        
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

        return post*/
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
