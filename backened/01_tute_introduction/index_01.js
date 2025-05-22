
console.log("hello world");

function sum(a,b){
    return a +b ;
}

function difference(a,b){
    return a-b ;
}

const age = 21 ;

module.exports = sum ; 
module.exports = difference ;

module.exports = {sum , difference  ,age } ;

// module.exports se hum ek hi value export karskte hai 