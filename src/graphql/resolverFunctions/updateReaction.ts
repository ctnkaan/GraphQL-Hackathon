import PostSchema_MongoDB from '../../models/Schema.js'

export const updateReaction = async (id: number, vote: string) => {
    
    //find the post with the provided id
    //update the reactions according to the vote
    //save the database, return the updated post
    
    const post = await PostSchema_MongoDB.findOne({ id:
        id
    })

    if (post === null) {
        throw new Error('Post not found with id: ' + id)
    }
    
    if (vote === 'thumbsUp') {
        post.reactions.thumbsUp++
    }
    else if (vote === 'thumbsDown') {
        post.reactions.thumbsDown++
    }
    else if (vote === 'rocket') {
        post.reactions.rocket++
    }
    else if (vote === 'heart') {
        post.reactions.heart++
    }
    else {
        throw new Error('Invalid vote')
    }

    await PostSchema_MongoDB.updateOne({
        id: id
    }, {
        reactions: post.reactions
    })

    console.log('Post updated')

    return post
}