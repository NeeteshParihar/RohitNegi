
// async : ek keyword hai jisse asyncchronus function define kare ja skte hai 
// await : keyword , jo ki async func ke andar hi use hota hai , iska benefit ye hai ki ye tab tak wait karbata hai jab tak async operation 
// complete na ho jaye / uski state jab tak  pending rehti hai 

// await waits only jab promise state "pending" ho , agar resolved or reject ho then it will not wait 

function canPlace() {
    return 0.5 > Math.random();
}

function getToken() {
    return Math.floor(Math.random() * 1000);
}

function placeOrder(cart) {
    return new Promise((resolve, reject) => {

        const flag = canPlace();
        setTimeout(() => {

            if (flag) {
                console.log(`Order placed: ${cart}`);
                const order = {
                    token: getToken(),
                    items: cart,
                    total: cart.length
                }
                resolve(order);
            } else {
                reject("Order not available");
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
                phone: "123-456-7890",
                location: "pipliyana"
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


async function processOrder(cart) {

   try{
    const order = await placeOrder(cart) ; // wait karega jab tak promise resolved ya reject nahi ho jata 
    const orderDetails = await prePareOrder(order) ;
    const dropLocation = await pickupOrder(orderDetails) ;
    const ans = await deliverOrder(dropLocation) ;

    console.log(ans) ;    

   }catch(err){
    console.log(err) ;

   }
}


processOrder(["pizza" , "dal bahfle" , "paneer tikka"] ) ;

