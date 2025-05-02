
// callback hell

function placeOrder(fn) {
    console.log("talking with dominoz...");

    setTimeout(() => {
        console.log("ordered placed");
        fn();
    }, 2000);
}


function prePareOrder(fn) {
    console.log("prepraring order...");

    setTimeout(() => {
        console.log("ordered prepared");
        fn();
    }, 5000);

}


function pickUp(fn) {
    console.log("partner going to pickup...");

    setTimeout(() => {
        console.log("ordered picked up");
        fn();
    }, 3000);
}


function deliver(fn) {
    console.log("delivery partner arriving...");

    setTimeout(() => {
        console.log("order delivered");
        fn();
    }, 4000);

}

// placeOrder() ;
// prePareOrder() ;
// pickUp() ;
// deliver() ;

/*

    talking with dominoz...
    prepraring order...
    partner going to pickup...
    delivery partner arriving...
    ordered placed
    ordered picked up
    order delivered
    ordered prepared


    the execition is happens like above problem is that order prepration stateded before order placed

    so we uses callback hell 

*/




// callback hell : its a technique of calling callback function by a function or callback function 
// callback hell is a techniqure jisme callback func / func callback funtion ko call karta h 
// use case : jab hame ek call back ko doosre callback ke baad hi chalana chahte hai , jab order matter kare 


placeOrder(() => {

    prePareOrder(() => {
        pickUp(() => {
            deliver(() => { });
        })
    })

});



// the callback hell is hard to debug and hard to maintain  and there can be multiple calls 


