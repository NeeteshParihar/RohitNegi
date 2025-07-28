import {Schema, model} from "mongoose";
import Validator from "validator";

const userSchema = new Schema({
    userName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true,   
    },
    emailId: {
         type: String,
        trim: true,
        toLowerCase: true,
        validate: {
            validator : (emailId)=>{
                return Validator.isEmail(emailId);
            },
            message: (obj)=>`emailId ${obj.value.emailId}  is not valid`
        }
    },
    password: {
        type: String,
        required: true
    }
})

const users = model('users', userSchema);
export default users;

