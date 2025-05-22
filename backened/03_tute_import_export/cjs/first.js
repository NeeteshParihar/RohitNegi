

const {sum , sub , mul} = require("./Math") ; // it by default picks module whose name is index.js 

/* 
  i am using multiple modules from the same  folder (Math) , to get all the modules in one go we can create a bridge / intermediate module which can give me all the modules 
  
  const sum = require("./Math/sum.js");
  const sub = require("./Math/sub.js");
  const mul = require("./Math/mul.js");

 */


console.log(sum(1,2)) ;
console.log(sub(1,2)) ;
console.log(mul(1,2)) ;

