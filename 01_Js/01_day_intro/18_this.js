
// global object 

console.log("hello world") ;
console.log(Math.random()) ;
// from where these methods are coming from --> global object 
// global object --> object which can be used anywhere in the code which is built int 

// in browser , global object is window 
// in nodejs it is global 
// check in the console of browser 

// all the things which have global scope are became the part of global object 
// variable with var , classical func 


console.log(global) ;

var temp  = 10 ;

//in different environment 
// the common name of  global object is "globalThis" 


console.log(globalThis) ;  // globalthis is available in every environment due to standerization 


console.log(globalThis.Math.random()) ;



// this keyword 

// its a pointer pointing to the object 

//1.Global Context (outside any func) 
//2.globally in browser this points to window 
//3. globally in nodejs this points to empty object called Module's exports object 


 const obj = {
	name : "Neetesh" ,
	print : function(){
		console.log(this.name) ;
	}
 }

// print is called from the obj so it has the context .refrence of obj 
obj.print() ;


