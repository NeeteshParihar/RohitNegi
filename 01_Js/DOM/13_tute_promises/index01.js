


console.log("hello") ;

// this seTimeOut and  the callback function and time  are submited to browser , and then browser submits the callback function to the callback queue
// after the the given time here it is  "0" miliseconds  ,
// the callback function is now in the callback queue now its job of event loop to transfer it to the call stack 
// but bo tab tak transfer nahi karega jab tak callstack empty nahi ho jaati and due to this callback function executed at the end 

// turant time complete hone par submit nahi karte to prevent rase-around condition
// event listners bhi async function hote hai and bo bhi aise hi kaam krte hai 
// jab the event handler submits the event and callback to the browser 
// then jab jab event trigger hoga tab tab browser  callback function ko callback queue mai daal dega 
// and jaise hi call stack empty hogi to event loop callback function ko stack mai daal dega 
// and then its execited 


setTimeout(()=>{
    console.log("callback")
},0);

const time = new Date() ;

console.log("waiting");

while(new Date() - time < 5000){

}
console.log("end") ;










