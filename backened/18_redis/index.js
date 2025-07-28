
import authenticateRouter from "./Routes/auth.js";
import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import redisclient from "./redis.js";

dotenv.config({path: './temp.env' });

const PORT = process.env.PORT;
const connectionKey = process.env.connectionKey;
const database = process.env.database;

const app = express();


// middleWare  
app.use(express.json()); // it will parse the json string into js object 
app.use(cookieParser()); // it will take the cookies from header at attaches it to the body 

app.use("/auth", authenticateRouter);

async function initializeConnections(){

    try{
        
        // await mongoose.connect(`${connectionKey}${database}`);
        // console.log("connected to mongodb");

        // await redisclient.connect();
        // console.log('connected to redis');

        await Promise.all([redisclient.connect(),mongoose.connect(`${connectionKey}${database}`) ]);
        console.log("connected to redis and mongodb");

        app.listen(PORT, ()=>{
            console.log(`server started at port : ${PORT} `);
        })

    }catch(err){

    }

}

initializeConnections();

