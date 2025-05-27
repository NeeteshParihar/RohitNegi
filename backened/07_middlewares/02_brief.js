
/* 

route and middleware both are handlers who handles request,

handlers --> are ways to tell how the server /app is goiing to handle the reqeusts 

middleware are special type of handlers , who can listen to any http request 
like get , patch , put , delete and others , the url of middleware should be matched
with initial  url of the search url  like /book of middleware handles /book/../..

benefits --> writing the logs , verifying user , authentication , authorisation ad other operations can be done 

in one go middlewares are handlers who act as the middleman or middleprogram ,
which proceses user request and forwards the request to the route handler or another 
middleware some middlewares can also send the response 

 */


import express from "express";

const app = express() ;
const PORT = 5007 ;

function print(val){
    console.log(val);
}

// <------------syntax1----------->



app.use("/book/user" , [(req , res , next)=>{

    print("one");
    next() ;// go to next handler
    
},(req , res, next)=>{
    print("two");
    next(); // go to next handler --> it can be middleware or route 
}] , (req , res , next)=>{
    print("three");;
    next();
})

app.use('/book' , (req ,res)=>{
    
    print("i'm the culprit");
    res.send("middleware");
})

//<------------- syntax2--------------->

app.use("/chatgpt/user/name" , (req , res,next)=>{  
    
    print(req.url); // tells ki iske aage url kya hai /chatgpt/user/name
    next();  
})

app.use("/chatgpt/user" , (req , res, next)=>{
    print(req.url);
    next();
})

app.use("/chatgpt" , (req , res , next)=>{
    print(req.url);
    // res.send("go ahead");
    next() ;
})

// comple url endpoint or route path should be matched 
app.get("/chatgpt/user/name" , (req , res , next)=>{
    // res.send("i am get method");
    print(`from get : ${req.url}`); // it tells the complete url /chatgpt/user/name?...
    next();

    req.url = "/user" ;  // changes does'nt affect req and res object and next() ko bhi nahi 
})
app.get("/chatgpt/user/name" , (req , res)=>{

    print("i am get down");
    print(req.url) ;

    res.send("i am get method");

})

app.put("/chatgpt/user/name" , (req  , res)=>{
    
    res.send("i am put method");
})

app.use(express.json());

app.listen(PORT , ()=>{
    console.log(`hey buddy server is running at http://localhost:${PORT}`);
})


























