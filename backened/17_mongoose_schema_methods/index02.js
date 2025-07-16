import mongoose from "mongoose";
import express from "express";
import JWT from "jsonwebtoken";
import cookieParser from "cookie-parser";
import url from "../connectionString.js";
import Validator from "validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// agar index02.js or server jis file main run ho raha hai usme .env nahu hai to uska path mention kardo
dotenv.config({ path: '../.env'});


// console.log(process.env.connectionKey);

const connectionKey = process.env.connectionKey;

// used for encryptionconnectionKey
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PORT = process.env.PORT;
const tokenExpirytime = process.env.tokenExpiryTime;


// <---------- define the schema ---------->

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

// we can attach methods in the Schema and these methods can be used using the model instance 
// model treat as class or collection the instance has the properties and access of the methods of the class 

// these two as called instance methods 
UserSchema.methods.sendAccessToken = function(res){
    
    const accessToken = JWT.sign({emailId: this.emailId}, PRIVATE_KEY, {expiresIn: tokenExpirytime});
    res.cookie("accessToken", accessToken);
}

UserSchema.methods.checkPassword = async function(password){
    const val = await bcrypt.compare(password, this.password);
    return val;
}


// creating static method , these can be directly called by the model 

UserSchema.statics.getHashcode = async function (password, n = 10){


    const hashCode = await bcrypt.hash(password, n);
    return hashCode;
}


const Users = model("Users", UserSchema);


const app = express();

const connectToDB = async (url, database) => {
  await mongoose.connect(`${url}${database}`);
  console.log("connected to db");
};

connectToDB(connectionKey, "Blogging");

// middlwares
app.use(express.json());
app.use(cookieParser());

function auth(req, res, next) {
  try {
    const { cookies } = req;
    const { accessToken } = cookies;

    const payload = JWT.verify(accessToken, PRIVATE_KEY);
    req.emailId = payload.emailId;
    next();

  } catch (err) {
    res.status(401).json({
      success: false,
      message: "login session expired please login",
    });
  }
}

app.post("/signup", async (req, res) => {
  try {
    const { userName, emailId, password } = req.body;
    const user = await Users.exists({ emailId }); // return an userId 

    console.log(user);

    const ans = {
      code: 400,
      success: false,
      message: "user already exist please login",
    };

    if (!user) {

      ans.code = 201;
      ans.success = true;
      

      const newUSer = await Users.create({
        userName,
        emailId,
        password: await Users.getHashcode(password),
      });
      console.log("hello");


      ans.message = "signup successfully";
      ans.user = newUSer;
    }

    if (ans.success) {
      ans.user.sendAccessToken(res);
    }

    res.status(ans.code).json({
      success: ans.success,
      message: ans.message,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal error",
      err: err.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {

    const {  emailId, password } = req.body;
    const user = await Users.findOne({ emailId }).exec();

    const ans = {
      code: 404,
      success: false,
      message: "user not found, please signup",
    };

    if (user && await user.checkPassword(password) ) {
      ans.code = 200;
      ans.success = true;
      ans.message = "login successfully!";
      ans.user = user;
    } else if (user) {
      ans.code = 401;
      ans.message = "invalid credentials";
    }

    if (ans.success) {
      user.sendAccessToken(res);
    }

    res.status(ans.code).json({
      success: ans.success,
      message: ans.message,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


app.use(auth);

app.post("/debit", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "200$ debited",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal server error ",
    });
  }
});

app.get("/user", async (req, res) => {
  try {

    const {emailId} = req;

    res.send({emailId: emailId});

  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
});


app.use("/", async (req, res) => {
  res.status(404).json({
    success: true,
    message: "page not found!",
  });
});

app.listen(PORT, () => {
  console.log(`server running at PORT ${PORT}`);
});
