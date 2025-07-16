
import mongoose from "mongoose";

// so whe the user send the data without the fields that are required the mogoose check it with schema and throughs an error 


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,  // iske bina data submit nahi hoga ,
        minLength: 3,
        maxLength: 20,
        trim : true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim : true
    },
    age: {
        type: Number,
        min: 18,
        max: 35
    },
    gender: {
        type: String,
        // enum : ["male", "female", "others"] // other than these values are not accepted and error was thrown

        validate : function(value){        // its a function runs every time 

            if(!["male","female", "others"].includes(value)){
                throw new Error("wrong gender!");
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default : "this is profile photo"
    }

},{ timestamps: true })

// each document will be have records 1. whenn a acreated 2. last modified 

const Users = mongoose.model("Users", userSchema);

export default Users;


