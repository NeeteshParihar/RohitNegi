


// function fetchUser(){

//     console.log("fetching data ... ");

//     setTimeout(()=>{

//         console.log("data fetch successfully");

//     const name = "Neetesh" ;
//     // greet(name) ;
//     meet(name) ;

//     },2000);
// }



function fetchUser(fn){
    console.log("fetching user data ...");

    setTimeout(()=>{
        console.log("data fetched succesfully" ) ;
        const name = "Neetesh" ;
        fn(name) ;        
    },2000);
}

function greet(name){
    console.log(`hello ${name}`) ;
}

function meet(name){
    console.log(`Hello ${name} we will meet in indore`);
}


// fetchUser() ;


// importance of callback function is that we can pass a function to the function and use the different function at different conditions 


fetchUser(greet) ;
fetchUser(meet)  ; 

function operation( a , b , op){
    return op(a , b) ;
}

console.log(operation(2 , 3 , (a , b)=>a+b));

console.log(operation(2,3  , (a , b)=>a*b));

// the setTimeout is asynchronus function  


const arr = [1,2,3,4,5,6];

function filter1(num){
    if(num*num % 2 == 0) return true ;
    else return false ;
}


function filter2(num){
    if( ( num*num+ Math.floor((Math.random()*2)))% 2 == 0   ) return true ;
    else return false ;
}


// look at this filter we can use different -different callback functions to filter the data 
console.log(arr.filter(filter1)) ;
console.log(arr.filter(filter2)) ;



// callback function benefits : callback function se hum different-different operations kar skte hai data par 
// for ex: if i have a data of the youtuber channel 
// then we can define different-different functions for total comments , total likes , total dislikes etc 
// and we can do these operations 