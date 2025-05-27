
console.clear() ;

import express from "express";

const app = express() ;
const  PORT = 5007 ;

console.log("hello world");


// here u becames optional so /about and /abot are same 
app.use("/about/:user/:age/:email" ,(req,res)=>{
    console.log(req.params

    );
    res.send("I am About Page");
})

app.use("/contact" , (req , res)=>{
    res.send("I am contact page");
})


/* 

"/" ko last mai define karna bcm jab bhi server par request aat hai like 
/contact 
then bo / dekhkar "/" is route mai chala jata hai by thinking that ki iske ander /contact hoga 


 */


app.use("/" , (req , res)=>{
    res.send("I am Home page!");
})



app.listen(PORT , ()=>{
    console.log(`app runnning at port ${PORT}`);

    const time = new Date() ;
})


console.log("hi");


