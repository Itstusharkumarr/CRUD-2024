import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authroutes.js'
import dbconnect from './config/dbConnect.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'


//create sever
const server = express()
//configuration
dotenv.config()
//access port no.
const port = process.env.PORT || 6010
//converting json object
server.use(express.json())
//db connection
dbconnect()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

server.use(express.static(path.join(__dirname, './client/build')));
//cors error handle
server.use(cors())
//routing
server.use('/app/v1/', authRoutes)

server.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



server.listen(port, console.log(`server is running on port no. http://localhost:${port}`))