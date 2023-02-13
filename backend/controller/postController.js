import { ObjectId, Timestamp } from "mongodb"
import { getDb } from "../util/db.js"
import { verifyToken } from "../util/token.js"

const COL = 'posts'

export const newPost = async (req, res) => {
    console.log(`newPost called`)
    const token = req.cookies.token
    try {
        const db = await getDb()
        const verify = await verifyToken(token)
        const dbUser = await db.collection('users').find({ _id: new ObjectId(verify.userid) })
        const post = {
            user: dbUser,
            image: {
                url: req.body.image,
                public_id: req.body.public_id
            },
            content: req.body.content,
            tags: req.body.tags, // STRING, bitte #s mitspeichern
            createdAt: new Timestamp(),
            updatedAt: new Timestamp() // wird mit jedem folgenden Update wieder mit new Timestamp() geupdated
        }
        const result = await db.collection(COL).insertOne(post)
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(400).end()
    }
}

export const getAllPosts = async (req, res) => {
    console.log('get all posts')
    try {
        const db = await getDb()
        const posts = await db.collection(COL).find().toArray()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).end(error.message)
    }
}