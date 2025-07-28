import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import authRouter from "./routes/authrouter";
import commentRouter from "./routes/comments";
import cookieParser from "cookie-parser";
import redisclient from "./comp/redis";

dotenv.config({path: './temp.env' });
dotenv.config({path: './redis.env' });

const PORT = process.env.PORT;
const connectionKey = process.env.connectionKey;
const database = process.env.database;

const app = express();

app.use(cookieParser()); // use the cookie parser to get cookie header 
app.use(express.json()); // use the json parser 

app.use('/auth', authRouter);
app.use('/comments', commentRouter);
app.use('/', (req, res)=>{
    res.status(404).json({
        success: false,
        message: "resource does'nt exist"
    })
})

async function initializeConnections(){
    try{

        await Promise.all([mongoose.connect(`${connectionKey}${database}`),  redisclient.connect()]);
        app.listen(PORT, ()=>{
            console.log(`server is listening at PORT : ${PORT}`);
        })

    }catch(err){
        console.log('err in establizing connections', err);
    }
}


initializeConnections();


