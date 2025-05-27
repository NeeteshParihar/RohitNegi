

console.clear();

import express from "express";
import fs from "fs" ;

const app = express();
const PORT = 5008;
const hostName = "localhost";


app.use(express.json()) ; // middleware parse karta hai json string/ json data ko js object 



const path = "./users.json"  // remember jis folder se script run hogi us ke relative path hai ye 

// json data ko parse karne ki liye data json format mai hona chahiye means --> object notation or aray notation // not if the string containing anyther format changes or empty string then there will be error in parsing the data 
function readUsers(path){
    
    try{
        const res = fs.readFileSync(path,  "utf-8"); 
        const data = JSON.parse(res);
        const users = data.users ;
        return users ;

    }catch(err){
        // console.log(err);
        return [];

    } 
} // how to distinguise btw read error and error due to parsing 

function addUser(users , user){
    users.push(user) ;
    return users ;
}

function JSONformatedData(users){
    return  JSON.stringify({users : users }) ;
}

function writeUsers(path , users){

    try {           

        const formatedData = JSONformatedData(users); 
        fs.writeFileSync(path , formatedData);
        console.log("users written successfully");

        return {statusCode:200}; 
        
    } catch (err) {
        console.log("error writing user");
        return {statusCode:500};
        
    }

}

// i am telling to app to listen for get request at url endpoint "/" and when reqest comes at his route 
app.get("/" , (req , res)=>{

    res.status(200).send("I am your home page");

    console.log("hello world") ; /// it can run /// send only terminate the http response // basic 

})

app.get("/users" , (req , res)=>{

    const users = readUsers(path);
    res.status(200).send(users) ;

})

// another get request on the basis of parameters 

const attributes = {

    name : true ,
    languages : true,
    topic : true ,
    location : true ,
    id : true 
}


function getWords(text){
    let words = text.split(" ").filter((val)=>val!="");
    words = words.map(word=>word.toLocaleLowerCase());
    return words;
}


function getPercantage(userTopic , clientTopic){


    let totalMatched = 0 ;

     clientTopic.forEach((word)=>{
        if(userTopic.has(word)) totalMatched++ ;
     })

     const percentage = (totalMatched/(Math.max(userTopic.size , clientTopic.size)))*100;

     if(percentage===Infinity) return 0 ;
     return percentage;

}

function getByTopic(topic , users){

    const clientTopic = new Set(getWords(topic));

    let temp = [] ;

    users.forEach(user=>{

       
        const userTopic = new Set(getWords(user['topic'])) ;
        const percentage = getPercantage(userTopic , clientTopic) ;
        temp.push({
            percentage ,
            ...user 
        })
    })

  
    temp.sort((val1 , val2)=>{
        return val2.percentage - val1.percentage;
    })
 

    temp  = temp.map((user)=>{
        delete user.percentage
        return user ;
    })

   

    return temp ;

    
}


function getNewId(){
    const time = new Date();
    return String(time) ;
}

app.get("/user" , (req , res)=>{

    const constrants = req.query ;
    let users = readUsers(path);

    console.log(constrants);
  

    for(let key in constrants){  
        
        // if(key.toLocaleLowerCase() === 'topic') continue ;

        if( attributes[key] && constrants[key] ){

            users = users.filter((user)=>{ 

                if(Array.isArray((user[key]) )){  
                   
                    return user[key].find((language)=>language.toLocaleLowerCase() ===  constrants[key] ) ;
                   
                }
                else if(key.toLocaleLowerCase() != 'topic'){
                    return constrants[key].toLocaleLowerCase()=== user[key].toLocaleLowerCase();
                }else return true ;   

            }) ;            
        }

    }


      if(constrants['topic']){
        users = getByTopic(constrants['topic'] , users);
    }

    res.status(202).send(users);

})


app.post("/user" , (req , res)=>{    

    const users = readUsers(path);

    const user ={ id : getNewId() , ...req.body} ;

    addUser(users, user);
    const {statusCode} = writeUsers(path , users);

    console.log(statusCode);

    if(statusCode === 200) res.status(202).send(user);
    else if(statusCode === 500){
        res.status(505).send("error saving the user");
    }

})


app.delete("/user" , (req , res)=>{

    const {id} = req.query;


    if(!id)res.status(404).send("abort");

    const users = readUsers(path);

    const index = users.findIndex((user)=>user.id === id);

    if(index === -1)res.status(404).send("abort");

    const deletedUser = users[index];
    users[index] = users[users.length-1];
    users.pop();


    res.status(202).send(deletedUser);

    writeUsers(path , users);

})


app.listen(PORT , hostName , ()=>{
    console.log(`server is running at http://localhost:${5008}`);
})




