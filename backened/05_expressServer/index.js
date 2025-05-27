
import express from "express";

// console.log(typeof express);
// console.log(express.application);

console.clear() ;

/* 

  importing express gives us function which has its properties bcz its also an object 

  express() gives us instance of server which is also a function having some properties 
   req is an object 
   and res too  
*/

const app = express() ;
const PORT = 5008 ;

// console.log(  app) ;


// app.use ki bajah se request iske callback ke pass ja rahi hai 
// app.use routing ke liye use hota hai 
app.use((req , res)=>{
    // console.log(typeof res);
    res.send({
        name : "Neetesh" , 
        age : 21 ,
        email : "neeteshparihar22@gmail.com"
    })
})

app.listen(PORT , ()=>{
    console.log(`express server started at port ${PORT} `);
})


