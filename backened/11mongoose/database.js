
import mongoose from "mongoose";
import url from "../connectionString.js";

const database = "Instagram";

await mongoose.connect(`${url}${database}`);

console.log("connected"); 

// mongoose schema working , 1.define the shcema , 2.send the data 3. data go through the mongoose 4.moogse removes extra properties that are not defined in the schema of the model 

// note : model ke naam se hum easily easily collection se data le paate hai 