
const {url} = require("./key.js") ;


// promise is the object return by the async operation which represent the future value of the async operation

// isme promise ka status undeinfed rehta hai 
async function getData1() {
   
    setTimeout(()=>{
         return {
        name: 'John Doe',
        age: 30,
        city: 'New York'
    };
    }, 3000);
}


const res = getData1() ;

console.log(res) ;


// jab Promise construtor use karte hai then first status pending dikhata hai 
async function getData2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: 'John Doe',
                age: 30,
                city: 'New York'
            });
        }, 3000);
    });
}


const res2 = getData2() ;
console.log(res2) ; // promise object

console.clear() ;


/*

initially promise ka status pending hota hai 

fetch returns the object which known as promise kyoki result turant available nahi hota hai async task mai 
so , we dont know kab result awailable hoga so we uses function on promise object "then()" and "catch"
agar request accecpt hoti hai means koi problem nahi aati to promise ka status resolved ho jata hai
and then() function call hota hai
agar koi error aati hai to promise ka status rejected ho jata hai and catch function call hota hai

promise states : pending , resolve , reject 


*/

const res3 = fetch(url) ;  


// res.json() ; gives the body which has the response data 

// promise ko use karne ka tarika 
res3.then((res)=>{
    return res.json(); // its also async taks and returns promise 
})
.then((data)=>{
    console.log(data); 
})
.catch((err)=>{
    console.log(err);
}
) ;

// using muliple then() and catch() called promise chaining

function canPlace() {
    return 0.5 > Math.random() ;
}

function getToken(){
    return Math.floor(Math.random() * 1000) ;
}

function placeOrder(cart) {
    return new Promise((resolve, reject) => {

        const flag = canPlace() ;
        setTimeout(() => {
            
            if(flag){
                console.log(`Order placed: ${cart}`);
                const order = {
                    token: getToken(),
                    items: cart,
                    total: cart.length
                }
                resolve(order) ;
            }else{
                reject("Order not available") ;
            }
        }, 2000);
    });
}

function prePareOrder(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Preparing order: ${order.token}`);
            const restaurantDetails = {
                name: "Restaurant A",
                address: "123 Main St",
                phone: "123-456-7890" ,
                location : "pipliyana"
            }
            resolve(restaurantDetails);
        }, 2000);
    });
}

function pickupOrder(restaurantDetails) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Picking up order from: ${restaurantDetails.name} , ${restaurantDetails.location}`);
            const deliveryDetails = {
                driverName: "John Doe",
                vehicle: "Car",
                estimatedTime: "30 minutes",
                delivery_loction: "iet DAVV"
            }
            resolve(deliveryDetails);
        }, 2000);
    });
}


function deliverOrder(deliveryDetails) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Delivering order by: ${deliveryDetails.driverName} ariving at  ${deliveryDetails.delivery_loction} in ${deliveryDetails.estimatedTime}`);
            const deliveryStatus = {
                status: "Delivered",
                time: "10:00 AM"
            }
            resolve(deliveryStatus);
        }, 2000);
    });
}


placeOrder(["item1", "item2", "item3"])
.then((order)=>prePareOrder(order))
.then((orderDetails)=>pickupOrder(orderDetails))
.then((deliveryPerson)=>deliverOrder(deliveryPerson))
.catch((err)=>{
    console.log(err) ;
})

