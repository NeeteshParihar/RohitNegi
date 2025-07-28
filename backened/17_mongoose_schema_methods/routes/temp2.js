
import express from "express";
const temp2 = express.Router();

temp2.use("/", (req, res)=>{
    res.send("hello");
})

export default temp2;


