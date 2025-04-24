
/*
1.event bubling : jab event element par trigger hota hai to evnet
propogate karta hai outside ko , to-wards it parent , grandparent and so on
 until root element.

 // target element se root tak event ka propogate hona event bubling hota hai 

2.reponse time of inner elements is fast in event bubling kyoki 
event andar se propogate hokar aayaa hai 


3. event capturing : event travels from root element to targeted
element in th dom ( opposite of event bubling )

// root element se target element tak event ka propogation hona is event capturing 

 */


// by default third parameter false rehta hai 
// means default : bubling effect chalta hai 
// capturing ke liye : make it true 


const grandParent = document.querySelector(".g-parent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");



// jab child click ho to callback function execute karna 
// with event bubling / capturing 


// buble wala buble ko hi follow karta hai 
// capturing wala capturing ko hi follow karta hia 
// do tab tak trigger nahi hote jab tab unka flow nahi  aata 
// like from inward to outward 
// and outward to inward 


// it returns specific element that is actually targeted 
function getTarget(event){
    return event.target ;
}

// it returns all elements jin par event chala hai 
function getCurrentTarget(event){
    return event.currentTarget ;
}

child.addEventListener("click", (event) => {
    console.log("child clicked!");
    // console.log(getTarget(event)) ; 
    console.log(getCurrentTarget(event)) ; 
}, false)



parent.addEventListener("click", (event) => {
    console.log("parent clicked!");
    // console.log(getTarget(event)) ; 
    console.log(getCurrentTarget(event)) ; 

}, false)


grandParent.addEventListener("click", (event) => {
    console.log("grandParent clicked!");
    // console.log(getTarget(event)) ; 
    console.log(getCurrentTarget(event)) ; 


}, false)


/*

my observation 

case 1 . agar parent bubling and child bubling 
      // child first and parent later over all bubling      

      case 2 . agar child captruing hai and parent bubling 
      //  child follow the parent bubling , so child first then parent 

      case3 . agar child bubling and parent capturing 
      // child later parent first , from child follows captruing 

      case4 . child capturing and parnet capturing 
      // overall capturing 


   summary   : it depends on  the parent effect 
   
   
 */




// in both event bubling and event capturing 
// event kabhi bhi target ke andar nahi jata until andar ka part is clicked 



// event delegation