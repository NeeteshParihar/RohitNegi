
{   

    // understanding the non-primitive data types 
    // non-primitive means these are built by the programmer 

    // like array , function  , objects 

    // <-------------- array ------------------------>

    // stores multiple values using one identifier
    let arr = [ 0 , 1 ,2 ,3 ,4 ,  "Neetesh"] ;
    console.log(arr) ;
    console.log(typeof arr) ;
    console.log(arr[0]) ;
    console.log(arr.length) ;

    arr.push(10) ;
    console.log(arr) ;
    arr.pop() ;
    console.log(arr) ;

    const temp = arr.slice(0,2) ;
    console.log(temp) ;

    


}

{

    // <-------------- objects ------------------------>
    // kyo use hota h : to group related data with the name of the data 
    // its easier to excess the data using name in the object 

    const userName = {

        name : "Neetesh" ,
        email : "neeteshparihar22@gmail.com" ,
        password : "12342343@5345" ,
        balance : 111112435 ,
        age : 21 

    } 

    // userName acts as the container to store the related data in key value format 
    // what is the need of object if we have array 
    // ex : [  "Neetesh" ,  "neeteshparihar22@gmail.com" ,  "12342343@5345"  , 111112435 ,  21 ]
    
    // how we can know from array that whether it is the age or the bank balance 

    console.log(userName) ;
    console.log(userName.name) ;
    // the address is not defined or not present in th object so it shows undefined 
    console.log("address" in userName) ;
    console.log(userName.address) ;

    userName.age = 22 ;
    console.log(userName.age) ;

    userName.address = "Indore" ;
    console.log(userName) ;

    console.log("address" in userName) ;


}


 {   // <-------------- functions ------------------------>

    // what are the functions 
    // these are the the values that holds the block of statments 
    // we can use function anywhere whenever we want using its name 

    const print = function(val){
        console.log(val) ;
    }

    print("Neetesh Parihar") ;
    console.log(typeof  print) ;


}

 {   // <-------------- type conversion ------------------------>
    //1. implicit ( by default in language)   2. explicit ( done by programmer)

    // explicit 

    let response = "125393" ; // balance in string 

    let accountBalance = Number(response) ;
    console.log(accountBalance) ;
    console.log(typeof accountBalance) ;

    // update 
    accountBalance += 10 ;
    response = String(accountBalance) ;
    console.log(response) ;
    console.log(typeof response) ;


    // boolean to number 

    let employed = false ;
    let num1 = Number(employed) ;
    console.log(num1) ;

    // number to boolean : 0 is false  and all values are true 

     num2 = -4 ;
     console.log(Boolean(num2)) ;
     num2 = 0 ;
     console.log(Boolean(num2)) ;
     num2 = 2 ;
     console.log(Boolean(num2)) ;

     // "" , undefined , null , nan are false ;

     console.log("\n\n\n")

     console.log(Boolean("")) ;
     console.log(Boolean(undefined)) ; 
     console.log(Boolean(null)) ; 
     console.log(Boolean(NaN)) ; 

     // these values are not resulted  in a number  so NaN ( not a number)
     // jab bhi value number nahi ban sakti then Number() conversion mai NaN aayega 
     console.log(Number("122n")) ;
     console.log(Number("122s")) ;

     console.log(Number(null)) ;  // 0 
     console.log(Number(undefined)) ; // NaN 


     // conversion into string 

     console.log(String(242532)) ;
     console.log(String(true)) ;
     console.log(String(null)) ;
     console.log(String(undefined)) ;
     console.log(String(NaN)) ;

     // arithmetic operators : + , -  ,* , / , % 

     console.log(30%3) ;  // gives values from 0 to 3-1 

     // increament and decrement operator 

     let sum = 5 ;
     console.log(sum++) ;
     console.log(sum) ;
     console.log(++sum) ;
     console.log(sum--) ;
     console.log(--sum) ;

     // assignment operators 
    
     let val = 5 ;
     val += 2 ;
     val -= 2 ;
     val *= 1 ;
     val /=1 ;
     val %=val+1 ;
     console.log(val) ;


}