import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const dbconnect = ()=>{
 try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('connected to database')
 } catch (error) {
    console.log('database is not connected',error)
    
 }
   
}

export default dbconnect