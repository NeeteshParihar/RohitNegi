
import {mongoose  } from "./packages.js";



async function connectDatabase(targetUrl){
   try{
     await mongoose.connect(targetUrl);

     console.log(`connected to database `);
   }catch(err){
    //   console.log(err);
      console.log(` error connecting to mongoose check the database.js connectDatabse function`);
   }
}


export default connectDatabase;



