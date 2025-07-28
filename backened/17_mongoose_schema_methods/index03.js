
import express from "express";
import likesRouter from "./routes/likes.js";
import commentRouter from "./routes/comments.js";
import authenticateRouter from "./routes/authenticate.js";
import JWT from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Users from "./models/user.js";
import mongoose from "mongoose"; 
import temp1 from "./routes/temp1.js";
import temp2 from "./routes/temp2.js";


import dotenv from "dotenv"; // this module loads the environment variables in runtime 
dotenv.config({ path: '../.env' }); // relative to the directory form which the server is running 


const PORT = process.env.PORT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const connectionKey = process.env.connectionKey;


async function auth(req, res, next){
    try{

        const {accessToken} = req.cookies;
        
        const payload = JWT.verify(accessToken, PRIVATE_KEY );
        console.log(payload);
        let emailId = payload.emailId;
        const existingUser = await Users.findOne({emailId});
        req.user = existingUser;  
        
        next();

    }catch(err){

        res.status(500).send({
            success: false,
            err: err.message
        })

    }
}

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(`${connectionKey}${'Blogging'}`);

// app.use('/', temp1); // agar isme nahi mila to neeche doonega for same url endpoint 
// app.use('/', temp2);


app.use("/auth", authenticateRouter); // agar is route mai nahi mila url then it will keep on searching in below like it does normally 

// app.use((req, res)=>{
//     res.send("hello world");
// })


app.use(auth); 

app.use('/likes', likesRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});

