
import express from "express";
import fs from "fs" ;
import { filter, end, getUniqueID } from "./utilities/index.js";
import { validateSchema, auth } from "./middleware/index.js";


const app = express();
const PORT = 5008;


const adminCart = [
    { name: "noodles", category: "veg", price: 50, id: 0 },
    { name: "chicken wings", category: "non-veg", price: 120, id: 1 },
    { name: "paneer tikka", category: "veg", price: 90, id: 2 },
    { name: "fish curry", category: "non-veg", price: 150, id: 3 },
    { name: "mushroom soup", category: "veg", price: 70, id: 4 },
    { name: "egg biryani", category: "non-veg", price: 100, id: 5 },
];

const userCart = [];

function logHandler(message = "request has arrived"){

    return (req , res , next)=>{
        console.log(message);
        console.log(`${req.method} request for ${req.url} at ${new Date().toString()} `); // log the info 
        next() ;
    }
}

app.use(express.json());
app.use("/admin", auth);
app.use('/user' , auth);
app.use(logHandler());   // like express.json() it also will run every time 


// we have to rl
app.get('/food', (req, res) => {

    // console.log("hello") ;


    const constrants = req.query;

    const ans = filter(adminCart, (data) => {

        let isEqual = true;

        for (let key in constrants) {
            if (constrants[key]==undefined || !data.hasOwnProperty(key) ) continue;

            if (String(constrants[key]) !== String(data[key])) {
                isEqual = false;
                break;
            }

        }

        return isEqual;

    });

    // console.log(ans);

    end(res, ans, 200);
})

/* 

schema :

{ id , name , category : veg , price} ;

for posting shcema should be { name , category : veg , price} id will be added dynamically

*/


app.post('/admin', validateSchema({ name: "", category: "", price: 0 }), (req, res) => {

    let { body: newItem } = req;
    const idForNewItem = getUniqueID(adminCart);

    newItem = { id: idForNewItem, ...newItem };
    // newItem.id = idForNewItem ;

    adminCart.push(newItem)

    end(res, newItem, 201); // created successfully ;

})



app.delete('/admin', validateSchema({ id: -1 }, "specify id"), (req, res) => {

    const { body: { id } } = req;

    const index = adminCart.findIndex((item) => String(item.id) === String(id));
    if (index === -1) {
        end(res, "item not found", 404);
        return;
    }
    const deletedItem = adminCart[index];
    adminCart.splice(index, 1);

    end(res, deletedItem, 200);

})



app.put('/admin',
    validateSchema({ id: -1, name: "", category: "", price: -1 },
        "bad request , please mention all attributes"),
    (req, res) => {
        const { body: { id, ...item } } = req;

        const index = adminCart.findIndex(item => String(item.id) === String(id));

        if (index === -1) {
            end(res, "item not found!", 404);
            return;
        }

        adminCart[index] = { id, ...item };
        end(res, adminCart[index], 200);


    })


app.patch("/admin", validateSchema({ id: -1 }, "bad request can't update without id"), (req, res) => {

    const { body: { id, ...item } } = req;

    const cartItem = adminCart.find((item) => String(item.id) === String(id));

    // undefined if not exist in adminCart 
    if (!cartItem) {
        end(res, "item not found", 404);
        return;
    }


    for (let prop in item) {
        if (cartItem.hasOwnProperty(prop)) {
            cartItem[prop] = item[prop];
        } 
    }

    end(res, cartItem, 200);

})



// <------------------ implementation of user request -------------------->

app.get("/user/my-cart" , (req , res)=>{
    end(res , userCart , 200) ;
})


/* 
   i have two ways to do this : 1.get id from user search the foodItem in admin and then add but its tightly couled
   with admin , and if admin database is different then we have to make request 

   get the data from the user 

*/ 
// if schema is valid then it will call the next handler function and calles the next handler function
app.post('/user/my-cart' , validateSchema({ name : "", category : "" , price : -1} , 
    "send all the attributed "), (req , res)=>{


        let {body:newItem} = req ;
        const id = getUniqueID(userCart) ;
        newItem = {id , ...newItem} ;

        userCart.push(newItem);
        end(res , newItem , 201) ;
})



app.delete('/user/my-cart' , validateSchema({id:-1} , 
    "Deletion is not possible without id"), (req , res)=>{
  try{
        const {body:{id}}  = req ;
        const index = userCart.findIndex((item)=>String(item.id) === String(id));

        if(index === -1) {
            end(res , "Item Not Found", 404);
            return ;
        }

        const deletedItem = userCart[index];
        userCart.splice(index,1);

        end(res , deletedItem , 200);
    }catch(err){
        end(res , "err occured , we will get back to you! ");
    }
})

// < ---------------------- error handling in expres ------------->

app.get("/dummy1" , (req , res)=>{

    // throw new Error("will it work");  it works but it crashed the server 

    // so write the code inside the try catch to prevent error and server crash 

    try{
        // const data = fs.readFileSync("/not-exist" , 'utf-8'); // bcz file not exist it throws an error 
        // so placing such code inside try block is usefull to prevent runtime errors which causes  server crash 
        // jis line par error aata hai usi lie se control goes to catch block 
        // end(res , "hello world");


        throw new Error("Error occured")

    }catch(err){
        end(res , `${err} , we will get back soon `  );
    }

})


app.listen(PORT, () => {
    console.log("server started at port", PORT);
})