import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'

import userRoutes from './routes/user'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Mongo Connected')
        app.listen(PORT, () => {
            console.log(`App running at ${process.env.APP_URL}`)
        })
    })
    .catch((err) => console.error('Mongo Conn Err:', err))


