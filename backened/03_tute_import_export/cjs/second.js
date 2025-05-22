
const fs = require("fs") ; // fs is a file module , iski help ke hum file system se interact karskte hai 

// path : absolute or agar same folder is active folder then only realtive path 
// utf-8 is encoding shceme of data 

// readfile is an asycn method 
fs.readFile('./first.js' , "utf-8" , (err , res)=>{
    console.log(res) ;
})
