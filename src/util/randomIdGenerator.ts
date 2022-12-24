const IDs = [] as number[]

export const randomIdGenerator = () => {
    let randomId = 0
    do {
        randomId = Math.floor(Math.random() * 1000)
    } while (IDs.includes(randomId))

    IDs.push(randomId)

    return randomId
}
