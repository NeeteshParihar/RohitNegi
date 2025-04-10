 
"use strict"   // shoud be written at the top 

console.log(this == window) ;

var  a = 10 ;
let b = 20 ;
const c = 5 ;

// clearly var is bcm part of window object 
console.log(this.a) ;
console.log(this.b);
console.log(this.c) ;



function sum(a,b){
	return a+b ;
}

// this  normal rules are followed 
let print = function(){
	console.log("hello world") ;
}

console.log(sum(1,2)) ;

console.log(this.sum(1,2)) ;
console.log(this.print() ) ;

// this inside the functin 


function fn1(){
	// this points to undefined in strict mode 
	// in normal mode it points to window 
	 console.log(this) ;
}

fn1() ;

// when runs in "use strict" mode it gives value of this as undefined 


// in both modes 
// fn1 has the context so this points to windw 
window.fn1() ;


// understanding the this in arrow function 

const obj = {
	name : "Neetesh" , 

	greet : ()=>{
		console.log(this) ;
	}


}

// objects ke brackets are not the block so its not the scope 
// so arrow function ka scope global hai is  case mai 
// so it inherits this from its lexical scope 


obj.greet() ;



const obj2 = {
	name  : "neetesh" ,

	greet :function (){
		// arrow func inherits this fomr its surroiding scope
		(()=>{
			console.log(this.name) 
		})() ;

		let arrow = ()=>{
			console.log(this.name)
		}

		let classical = function(){
			// it doesnt inherits from its lexical scope 
			// lexical scope means the scope in which it is present 

		  console.log("its undefined?")
			console.log(this) 
		}

		classical() ;
	}


}


obj2.greet() ;