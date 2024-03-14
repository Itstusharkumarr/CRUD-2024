import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    lastname:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        trim:true,
        required:true,
        unique:true
        
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

export default mongoose.model('users',userSchema)