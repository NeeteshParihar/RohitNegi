
import express from "express";
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

app.use(express.json())
app.use("/admin", auth);


// we have to r
app.get('/food', (req, res) => {


    const constrants = req.query;

    const ans = filter(adminCart, (data) => {

        let isEqual = true;

        for (let key in constrants) {
            if (!constrants[key] || !data[key]) continue;

            if (String(constrants[key]) !== String(data[key])) {
                isEqual = false;
                break;
            }

        }

        return isEqual;

    });

    console.log(ans);

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
        } else {

            end(res, "unkown atrributes found", 400);
            return;
        }
    }

    end(res, cartItem, 200);

})

app.listen(PORT, () => {
    console.log("server started at port", PORT);

})