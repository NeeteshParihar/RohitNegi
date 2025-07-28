import mongoose from "mongoose";
import Validator from "validator";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
    trim: true,
  },
  emailId: {
    type: String,
    trim: true,
    index: true,
    toLowerCase: true,
    required: true,
    validate: {
      validator: (emailId) => {
        return Validator.isEmail(emailId);
      },
      message: ({ value: { emailId } }) => `${emailId} is invalid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = model("Users", UserSchema);

export default Users;