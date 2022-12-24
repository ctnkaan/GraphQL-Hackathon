import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'

import { Schema } from './graphql/schema.js'
import { Resolvers } from './graphql/resolvers.js'

const app = express()

//connect to mongodb
mongoose.connect('mongodb://localhost:27017', () => {
    console.log('Connected to MongoDB')
})

app.use(
    '/graphql',
    graphqlHTTP({
        schema: Schema,
        rootValue: Resolvers,
        graphiql: true,
    })
)

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
