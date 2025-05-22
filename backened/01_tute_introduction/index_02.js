const { sum, difference, age } = require("./index_01.js"); // is file ko le aao yaha par  // we can add this line anywhere require("")

/* 

    the index_01.js code will come as wraped in immeddiate function 

    (function(){
   <---------code of index_01.js--------->
    })()

    so agar mai sum(2,3) access karne ki koses karu then we cant access that without explicit export statement 
    so functions variables and other datatypes are kind of un-accessible so we have to use special syntax to allow these variables 
    so that they can be used in other files 


 */

// imported properties but these are not part of this file 
console.log(sum(2, 3));
console.log(difference(2, 3));
console.log(age);

// let age = 5 ; cannot we use  same variable name multiple time in same scope 
// console.log(age) ;


console.log("Neetesh Parihar");

module.exports = { sum, difference };