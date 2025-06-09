
// import karlo mongoClient ko which helps us make object to connect to mongodb deployment

import { MongoClient } from "mongodb"; 

// console.log(MongoClient) ;
// this url contains info like cluster url , username and password 
import url from "../connectionString.js";

// create a object of mongoclinent ,this helps us connection to mongodb deployment or mongodb sever 
const client = new MongoClient(url);

// console.log(typeof client) ;

/* 
    cursor explained 
    so the cursor helps us retrieve data in portion called batches  from the database and it doesnot have all the data itself , and we can uses for await .. syntax to retrieve the documents from the batches , the condtion of exehausted batches is handled by for await loop .

    [Client Application]       [MongoDB Server]
       |                          |
       |--- find() request ----->|
       |<--- cursor ID ----------|
       |                          |
       |--- request batch 1 ----->|
       |<--- documents 1-101 -----|
       |                          |
       |--- request batch 2 ----->|  (when first batch is consumed)
       |<--- documents 102-202 ---|
       |                          |
       ... (until all docs received)


*/




async function insert(...data){

    try{
        await client.connect() ;
        const database = client.db("test");
        const users = database.collection("users");

        // const res = await users.insertOne(data) ;
        const res = await users.insertMany(data) ;
        console.log(res) ;
        

    }catch(err){

    }finally{
        client.close() ;
    }
}

// <--- experimental ------------>
async function fetch2() {

    try {

        await client.connect();

        const database = client.db("test");
        const users = database.collection("users");

        const cursor = users.find().batchSize(2); 

        let batchCount = 0;

        cursor.on('batch', (batch) => {
            console.log(`batch no. ${batchCount} , ${batch.length}`);
        })

        let countdocuments = 0;

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
           console.log(doc );

         }

        console.log(`bathces fetched ${batchCount}`);
        console.log(`documents fetch ${countdocuments}`);


    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

}


// <------- experimnetal ---------->
async function fetch1() {

    try {

        // findOne( ) returns promise 

        await client.connect();

        const database = client.db("no-exist");
        const users = database.collection("users");

        // bacthsize  == 1 means one document per batch , maxTimeMs is only applied to the first batch and if first batch timeOut then next batches arent fetches and if it processed within time the next batches does'nt go through time constraint

        /*  const userCursor = users.find().batchSize(1).maxTimeMS(5000); // returns a cursor 
 
         let count = 0;
         for await (const user of userCursor) {
             count++;
             console.log(user);
         }
 
         console.log(count); */

        // get data in array in one go 
        /*  const user = await users.find({}).toArray() ;
 
         console.log(user) ; */


    } catch (err) {

        console.log(err);

    } finally {

        client.close();

    }

}

async function main() {

    try {

        //  console.log("1") ;   

        // connect to the server of mongodb or connect to mongodb whatever 
        await client.connect();
        //  console.log("2") ;   

        // request bheje se pehle 
        // we need which database in a cluster , which collection and the query    
        const database = client.db("test");  //   database  contains info of which database and it also have url 
        const users = database.collection("users"); // its aobject which have info like which collection , database and url 
        const query = { "name": "sandhya" };  // konso document chahiye 

        // const user = await  users.findOne({});  // koi ek  document returns if no query or empty query 

        const user = users.find({});   // it returns a cursor 
        console.log(typeof user)
        for await (const doc of user) {
            console.log(doc);
        }

        // console.log(user ) ;

    } catch (err) {
        console.log(err); // agar err aye then handle in catch 
    } finally {
        await client.close();  // no matter err aaye ya na aaye but finally block hame chalega 
    }
}

async function run() {
    try {

        const database = client.db('not-exist');
        // console.log(database) ;
        const users = database.collection('users');
        // console.log(users) ;

        // Queries for a movie that has a title value of 'Back to the Future'
        const query = { "name": "sandhya" };

        console.log("send");
        const user = await users.findOne(query);  // send the query to database 
        console.log(user);



        // console.log(user);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }

    console.log("finish");
}

// run() ;
// main();

// fetch1();

// fetch2();

insert({"name"  : "neetesh" , "age" : 21 }, {"name" : "doreamon" , "age" : 16});
