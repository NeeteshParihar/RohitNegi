

// browser can understand the html , css and js 
// we can run js in interactive teminal "console"  

console.log("Hello world") ; 

// to run the js browser has the program called v8 engine to execute js 

// so to run js nativly outside the browser  we need runtime environment oneof is nodejs 

// there are others like bun , dino etc 
// ECMA is a associaton which standarised the js  which ensures that the core features and syntax remain same in scripting languages like javaScript , jsScript , livescript etc 

// diff browsers uses its own engines 
// chrome uses v8 engine  c++ is used in that and other also 

// Ryna dahl taken the v8 engine which is opensource and modified it to use in nodejs 
// for development use nodejs lts version bcz its stable 


let num = 10 ;
let name = "Neetesh" ;

console.log(name ) ;
console.log(num) ;

const userName = "Neetesh@1225" ;
console.log(userName) ;

try{
    userName = "Neetesh" ;
}catch(error)
{
    console.log("you are tring to change the userName which is constant") ;
}


console.log("hello Neetesh") ;

// donot use var keyword to make variables  
var val1 = 30 ;
console.log(val1) ;









