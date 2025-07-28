
import mongoose from "mongoose"; // this is used to create data models for the collections
import Validator from "validator"; // this is used to verify the emails

const {Schema, model} = mongoose;

const UserSchema = new Schema({
    userName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true,   
        index: true,

    },
    emailId: {
        type: String,
        trim: true,
        toLowerCase: true,
        validate: {
            validator: (emailId) =>{
                return Validator.isEmail(emailId);
            },
            message: ( {value} )=> `${value.emailId} is invalid`
        },
        required: true,        

    },

    password: {
        type: String,
        required: true,       
    }
});

const Users = model("Users", UserSchema);

export default Users;
