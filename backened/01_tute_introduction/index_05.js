
// hum require statement kahi  bhi likh skte hai 

function init(){


const {sort} = require("./index_04.js") ;
console.log("welcome into the tmep2.js") ;


const arr = [ 1,10,9,5,3,8] ;

sort(arr) ;

console.log(arr) ;


}

init();

// sort([9,8,7,4]) ;


// here the sort function is imported in temp2.js and exported from temp1.js this function also using some utility functions 
// like getSmallestIndex , swap these are private and does not exported

// so ek datatype jo ki export kiya gaya hai bo dusre datatypes jo export or non-export datatypes ko bhi use karskta hai 