
const heading1 = document.getElementById("third") ;

console.log(heading1) ;
console.log(typeof heading1);
console.log( heading1.innerHTML) ;
console.log(heading1.textContent) ;

// slecting the id with root 

const rootContainer = document.getElementById("root") ; 
console.log(rootContainer) ;
rootContainer.style.backgroundColor = "grey" ;
rootContainer.style.padding = "20px" ;

// choosing it headings

let h11 = document.getElementById("heading1") ;
console.log( "hello" , h11)  ; // jab the elemnt doesnt exist it gives null 

h11 = document.getElementById("first") ; 
console.log(h11.innerText) ;
h11.style.fontSize = "23px" ;

// selecting using class 

h11 = document.getElementsByClassName("header1") ;
console.log(h11[0].innerHTML) ;   // it gives us html collection 

console.log("printing by queryselector")

h11 = document.querySelector("h1") ; // query selector selects the first available element 

console.log(h11.innerHTML) ;


h11 = document.querySelectorAll("h1") ;

console.log("printing the h1's") ;

h11.forEach((h)=>{
	console.log(h.innerHTML) ;
 })



 console.log("printing document properties") ;

 console.dir(document) ;


 // if want to know the properties 
 console.log(document.__proto__) ;



 const h1Container = document.getElementById("first") ;

 console.log(h1Container) ;
 console.log(h1Container.__proto__) ;

 console.log(h1Container.id) ;
 console.log(h1Container.className) ;  // to access class of the element we uses className rather than class bcz it is reserved in js for making class 



const temp = document.getElementsByTagName("ul")[0] ;

console.log(temp.innerText) ;





























