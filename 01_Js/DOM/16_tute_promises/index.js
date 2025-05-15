// understandanding the promises 

const {url} = require("./key.js") ;

console.log(url) ;

const res = fetch(url) ; 

// the res will always be a promise so you should check wheather promise is resolved or not

function isResolved(value){
    return value && typeof value === "object" && value.status === 200 ;
}

function isPromise(value){
    return value && typeof value === "object" && typeof value.then === "function" ;
}

// while(isPromise(res)){
//     console.log("waiting") ;    
   
//     // this is a blocking code , bcz fetch immediatedly returns a prommise and this while loop checking if the promise is resolved or not 
//     // but the status of this promise is not changing because  actaully the promise is resolved in the background but the message or signale has to be passed
//     // to the main thread using microstack and event loop but as the while loop is running the callstack is not getting empty 
//     // so event loop does not get a chance to transfer the promise to the callstack

//     // the while loop is wiating for the promise to be resolved and the event lopp is waiting for the callstack to be empty 
//     // and this is the deadlock so none of the processes is getting done bcz of interdependency 

// }



// setTimeout(()=>{
//     console.log(res) ;
// } , 2000) ;


// the intervalID is a blocking code bcz the of the variable intervalID is not getting deleted 

// const intervalID = setInterval(()=>{
//     console.log("waiting") ;
//     if(!isResolved(res)){
//         console.log("waiting") ;
//     }else{
//         clearInterval(intervalID) ;
//         console.log(res) ;
//     }
// } , 1000) ;
