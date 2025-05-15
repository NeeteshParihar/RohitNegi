
// js is a single threaded and synchronus language 
// single threaded means one operation in a time 
// synchronus means ek - ke baad ek operations 



// syncrhonus nature 


console.log("10");

const time = new Date() ;
console.log("wating...");
while( new Date()- time < 2000){
    // wait to 2 seconds   
}

console.log("20") ;
console.log("30") ;

// asynchrouns nature 

console.clear() ;

console.log("asynchronus nature");


console.log("10");

setTimeout(()=>{
    console.log("20");

},2000);   

console.log("30") ;

/*

    in aync case 
    first 10 print hoga 
    now settime out call hoga jo ki naya thread bana dega and us thread mai is callback ko 2 seconds baad call kardega
    but ussme pehle main thread mai 20 print ho chuka hoga 


*/
