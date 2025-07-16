import mongoose from "mongoose";
import express from "express";
import JWT from "jsonwebtoken";
import cookieParser from "cookie-parser";
import url from "../connectionString.js";
import Validator from "validator";
import bcrypt from "bcrypt";

// used for encryption
const PRIVATE_KEY = "myPrivateKey";

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

const Users = model("Users", UserSchema);

async function getHashcode(password, n = 10) {
  const hashCode = await bcrypt.hash(password, n);
  return hashCode;
}

function isAuthenticateUser(password, hashCode) {
  return bcrypt.compare(password, hashCode);
}

function sendAccessToken(res, payload, time = 20) {
  const accessToken = JWT.sign(payload, PRIVATE_KEY, {expiresIn: time });
  res.cookie("accessToken", accessToken);
}

const port = 5008;
const app = express();

const connectToDB = async (url, database) => {
  await mongoose.connect(`${url}${database}`);
  console.log("connected to db");
};

connectToDB(url, "Blogging");

// middlwares
app.use(express.json());
app.use(cookieParser());

function auth(req, res, next) {
  try {
    const { cookies } = req;
    const { accessToken } = cookies;

    const payload = JWT.verify(accessToken, PRIVATE_KEY);

    req.payload = payload; // after veficaton anyone can use the payload
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

    const user = await Users.exists({ emailId });

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
        password: await getHashcode(password),
      });

      ans.message = newUSer;
    }

    if (ans.success) {
      sendAccessToken(res ,{userName, emailId});
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
    const { userName, emailId, password } = req.body;
    const user = await Users.findOne({ emailId }).exec();

    const ans = {
      code: 404,
      success: false,
      message: "user not found, please signup",
    };

    if (user && isAuthenticateUser(password, user.password)) {
      ans.code = 200;
      ans.success = true;
      ans.message = user;
    } else if (user) {
      ans.code = 401;
      ans.message = "invalid credentials";
    }

    if (ans.success) {
     sendAccessToken(res ,{userName, emailId});
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
      message: "200INT debited",
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
    const {
      payload: { userName, emailId },
    } = req;
    const user = await Users.findOne({ emailId }).exec();

    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});
app.use("/", async (req, res) => {
  res.status(404).json({
    success: true,
    message: "page not found!",
  });
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
