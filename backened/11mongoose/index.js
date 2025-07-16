/* 

import "./database.js";
// import mongoose from "mongoose" ;
import  instaposts from "./models/instaposts.js";


// console.log(instaposts) ;  

// console.log(mongoose.connection === instaposts.db) ; // the mogoose instance shares the same cache memory  so even we connects and creates models using differnt instance they actaully are same 

// const res = await instaposts.find() ;

const res = await instaposts.insertOne({name : "sheru"}) ;

console.log(res) ; */

import app from "./server.js";
import "./database.js";
import instaposts from "./models/instaposts.js";
import useragent from 'useragent';  // to get os of client from 

function getOs(req) {
    const agent = useragent.parse(req.headers['user-agent']);
    const os = agent.os.toString(); // e.g., "Windows 10", "Mac OS X"

    return os;
}

function getIp(req) {
    return req.ip || req.headers['x-forwarded-for'];
}

function getPort(req) {
    return req.socket.remotePort;
}

function logger() {
    return async (req, res, next) => {
        console.log(`request came from ${getOs(req)} , ${getIp(req)} , ${getPort(req)} at ${new Date()}`);
        next();
    }
}

app.use(logger());

app.get("/post", async (req, res) => {

    try {

        const { query } = req;
        console.log(query);

        const post = await instaposts.find(query);
        res.status(200).send(post);

    } catch (err) {

        res.status(500).send("we will came back for you soon");

    }


})

app.delete("/post" , async (req , res)=>{

    const { body : userPost } = req ;
    try{

         const deletedPost = await instaposts.deleteOne(userPost); // delete the one user's post which is eqaul to the object 

         console.log(deletedPost) ;

         res.status(200).send(deletedPost) ;


    }catch(err){
        console.log(err);
        res.status(500).send("we will get back soon")
    }
   



} )

app.post("/post", async (req, res) => {

    try {

        const { body: newPost } = req;
        const ans = await instaposts.insertOne(newPost);

        res.status(201).send(ans);

    } catch (err) {

      res.status(500).send("we will came back for you soon");

    }




})


app.put("/post" , async (req , res)=>{

    try{

        const {body:[filter , data]} = req ;

        console.log(filter , data); 
        const ans = await instaposts.updateOne(filter , data); 
        res.send( ans );    

    }catch(err){
        console.log(err);
        res.send("err");
    }

})
