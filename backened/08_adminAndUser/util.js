
import fs from "fs";

function readFile(path){

    try{

        const res = fs.readFileSync(path , 'utf-8');
        
        if(res==="") return []; // in case of empty file 

        const data = JSON.parse(res);
        return data ;

    }catch(err){
         
        console.log("err reading the file ");
        return [] ;

    }

}

function writeToFile(path , JSONDATA ){

    try {
        fs.writeFileSync(path , JSONDATA); 
        return {status : 200};       
    } catch (err) {
        console.log("error during writing in file");
        return {status : 500};        
    }

}

function startServer(PORT  , app , hostname = "localhost", message=`server started at http://${hostname}:${PORT}` ){
    app.listen(PORT , hostname , ()=>{
        console.log(message);
    })
}


export {readFile , writeToFile , startServer};

