


import { MongoClient } from "mongodb";
import url from "./connectionString.js";


const client = new MongoClient(url);


async function insertMany(...data) {
    data = data.flat(Infinity);
    try {

        await client.connect();
        const database = client.db("hero");
        const users = database.collection("users");

        const res = await users.insertMany(data);
        console.log(res);


    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}



async function fetch2() {

    try {

        // connect explicitly 
        await client.connect();

        const database = client.db("test");
        const users = database.collection("users");

        const cursor = users.find({ name: "sandhya" });

        for await (const data of cursor) {
            console.log(data);
        }



        //   res.then((data)=>{
        //     console.log(data) ;
        //   }).catch((err)=>{
        //     console.log("connection closed");
        //   })

        // console.log("hello");

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }


}


// fetch1() ;
// // fetch2();


async function update() {

    try {

        // connect explicitly 
        await client.connect();

        const database = client.db("takken");
        const users = database.collection("users");


        await users.updateOne(
            { item: "paper" },
            {
                $set: { 'size.oum': 'cm', status: 'p' },
                $set: { qty: -10 },
                $currentDate: { lastmodified: true },
                $currentDate: { hello: { $type: "timestamp" } }
            }
        )

     const res5 =    await users.updateMany(
            {name : "neetesh"},
            {
                $set : {
                    name : "Neetesh",                    
                }
            }
        )

        console.log(res5);

        await users.replaceOne(
            { item: 'paper' },
            {
                item: 'paper',
                instock: [
                    { warehouse: 'A', qty: 60 },
                    { warehouse: 'B', qty: 40 }
                ]
            }
        )

        const item = await users.findOne({ item: "paper" });
        console.log(item);


    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }

}




async function deleteData(){
    try {
        await client.connect();
        const database = client.db("hero2");
        const restaurants = database.collection("users");

        // const res = await restaurants.deleteMany({});

        // delete all who matches the query  , jis  document mai name "neetesh" ho un sabhi ko delete kardo mai-baap
        // const res = await restaurants.deleteMany({name : "Neetesh"});


        const res = await restaurants.deleteOne({item : "paper"});
        console.log(res);

    } catch (error) {
        
        console.log(error);

    }finally{
        await client.close();
    }
}


deleteData();


// update();


// insertMany({name : "neetesh"})
