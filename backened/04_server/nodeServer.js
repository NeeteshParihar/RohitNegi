
// creating server using nodejs 

// http module se http object lelo 

const http = require("http");

// console.log(http);

const PORT = 5007 ;

// http server is created 



function getURL(req){
    return req.url ;
}

// jab-jab reuest aayegi tab tab ye callback function execute ho jaega 
const server = http.createServer((req , res)=>{

    if(getURL(req) === "/"){
        res.end("hello Neetesh") ;
    }else if(getURL(req) === "/contact"){
        res.end("neeteshparihar22@gmail.com");
    }else{
        res.end("hello world");
    }
    

});

// console.log(server) ;

// i told server to listen at the PORT and jab server us port pe listen karna start kardega tab cllback chaljayega 
server.listen(PORT , ()=>{
    console.log("server is listening at port " , PORT) ;
})



console.log("hello") ;


/* 

theory of servers 

1.server is an application 
2.application  runs in a machine and identified by a port number , so an app runs on a particular port 
3.to reach out the app we need machine ip address and app's port number 
4. then we can reach out the application and make requests 

 */