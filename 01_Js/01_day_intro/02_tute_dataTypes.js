
// understanding the dataTypes in js 

// literals vs variables 

// literals : these are the values itself and does not needed to be processed to get the values , 
// ex : 1 , 2 , 2.5 , true , false , "neetesh"

// variables : these are the names  that may have the memeory access and are evaluted to get actaul value 
// ex : num  , name  etc 


// primitive data types : these are the core data strucutures  comes built in  and other data structures are built in top of these 


//---------- numbers  -----------

// number : any real number 1.2 , 3.4 scintifi numbers 
let age = 21 ;
console.log(age) ;
console.log(`this is ${typeof age}`) ;

//---------- strings -----------

let name = "neetesh" ;
console.log(name) ;
console.log(`this is ${typeof name}`) ;

// other strings 
console.log('Neetesh') ;
console.log(`Neetesh ${age}`) ; // string literal 

// scape character '\'

console.log(" \"Neetesh\" ") ;

//---------- boolean -----------

console.log(true , false ) ;
const above18 = true ;
const underAge = false ;
console.log(above18) ;
console.log(underAge) ;

console.log(typeof true) ;


//---------- undefined -----------

// 
try{
    // constant must be initialed so this comes under syntax error and try and catch hanles runtime errors 
    // const val ;    
}catch(error){
    console.log("const must be initialized") ;
}


// jab value initilze nahi karte then by default it is undefined  : not yet given or not yet known

let val ;
console.log(val) 

let val2 = undefined ;
console.log(val2) ;
console.log(`the value type is ${typeof val2}`) ; 


//---------- null -----------

// it is representation of nothing 

{
    let val = null ;
    console.log(val) ;
    console.log(typeof val) ; 

    // null is shown as object but this is the error in the language , but does not corrected bcz of the old code using null as the object 
}


//---------- bigint -----------

{
    // when we want to store the bigger intergers

    let num1 = 12345678910111213141516 ;
    console.log(num1) ;
    console.log(typeof num1) ;
    
    // in order to create bigint use n as suffix
    let num2 = 12345678910111213141516n ;
    console.log(num2 ) ;
    console.log(typeof num2) ;

    let num3 = 12n ;
    console.log(num3) ;
    console.log(num3) ;

    console.log(Number.MAX_SAFE_INTEGER) ;
    console.log(Number.MIN_SAFE_INTEGER) ;  

    console.log(1.)

}


