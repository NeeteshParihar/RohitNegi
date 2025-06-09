import express from "express";
import { instaPost , instgramReels , mongoose } from './model.js';
import url from "../connectionString.js";

const database = "instagram";
const targetDatabase =  `${url}${database}`;
const PORT = 5008;
const app = express() ;

mongoose.connect(targetDatabase) ;

function logger(){

    return (req , res ,next)=>{
        console.log(`request come from ${req.url}`);
        next() ;
    }

}

app.use(express.json());
app.use(logger()) ; // hey express use this handler  funtion 


app.get("/user/reels" , async(req, res)=>{

    const ans = await instgramReels.find();
     res.status(200).send(ans) ;


})

app.get("/user/instapost" ,async (req , res)=>{

    const ans = await  instaPost.find( );
    res.status(200).send(ans);

})


app.listen(PORT , ()=>{
    console.log(`server is running at port ${PORT}`)
})









