
import mongoose from "mongoose";
import url from "../connectionString.js";


function isClass(value) {
    return typeof value === 'function' &&
        /^class\s/.test(Function.prototype.toString.call(value));
}


// it refuses to connect if it is already connected  , and if the connection string is same and databse is also same then it continues with that connection 

async function main2(){

    try{

        const database = "dnsRecord";
        const path =   `${url}${database}`;

         await mongoose.connect(path);


        // create a schema 

        const recordSchema = new mongoose.Schema({

            name : String ,
            type : String ,
            isRecursive : Boolean     

        })


        // create a model or class or collection 

        const dnsRecord = mongoose.model('dnsRecord' , recordSchema);

        // create instance or object or documents

        // const googleRcord = new dnsRecord({name : "github.com" , type : "A" , isRcurive : false});
        // await googleRcord.save() ;

        // shorcut to create a document and save it in databse  collection 

        // insert the single record 
        // we usually use it to create single resource
        // await dnsRecord.create([{name : "chatgpt5.com" , type : "A"} , {name : "deepseek6.com" , type : "A"} , {name : "deepseek3.com" , type : "A"}]);


        await dnsRecord.insertMany([{name : "xyz.com" , type : "A"} , {name : "deepseek6.com" , type : "A"} , {name : "deepseek3.com" , type : "A"}])



        const records = await dnsRecord.find() ;

        console.log(records) ;


    }catch(err){
        console.log(err);
    }
}

async function main() {

    try {

        /* 

         the value null is accepted as it as without converting it into a string 
          ye schema aplly hota hai to all the documents withing the collection 

          kitten model se kittens collection ban jata hai agar collection na ho to database mai 

          case1. agar kam properties di but then mentioned in the schema it will be accepted by default 

          case2. it ignores undifined properties 
        
         */

        const database = 'temp';
        // connect to cluster using mongoose
        const res = await mongoose.connect(`${url}${database}`);

        // cat ke liye schema banao which have name as string 
        const kittySchema = new mongoose.Schema({
            name: String ,           
        })

        kittySchema.methods.speak = function speak(){            
            console.log(`${this.name} says Meow - Meow`);
        }

        // create a model 'kitten' from kittySchema
        const kitten = mongoose.model('kitten', kittySchema);

        const blackKitten = new kitten({name  : "black cat"});
        //  blackKitten.save();

        console.log(blackKitten);


        const {name , _id} = blackKitten ;
        console.log(name , _id);

        blackKitten.speak();

        const fluffy = new kitten({name : "fluffy"});
        await fluffy.speak();


        // await fluffy.save() ;

        console.log(await kitten.find({name :/^bla/ }));

        // ignoring the surnmae 
        const whiteKitten = new kitten({name : ()=>{}, surname : "kiteten"})


        await whiteKitten.save()

        // saves it  agar shcema se kam field de to save karleta hai 
        const emptyKitten = new kitten({name:kitten , surname : "kitten" });
        await emptyKitten.save() ;


        // make a model calles 'cats' or collection or class 
        const Cats = mongoose.model('cats' ,  kittySchema) ;

        const leapordCat = new Cats({name : "leapord"});
        await leapordCat.save() ;


    } catch (err) {
        console.log(err);

    } finally {

    }



}

// main();
main2();


