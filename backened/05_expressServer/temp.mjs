

import express from "express";

const app = express();
const PORT = 5008;
const hostName = "localhost";


app.use("/about/:name" , (req , res)=>{

    console.log(typeof req);
    console.log(typeof res);

    const {params} = req ;

    console.log(params);

    res.send("i am about!");

})

app.use("/" ,(req , res)=>{
    res.send("i am default");
})


// start the server at port and bind the server with hostname 
app.listen(PORT , hostName , ()=>{
    console.log(`server is running at port ${PORT}`);
})