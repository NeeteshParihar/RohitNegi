

import { createNewElement } from "./util.js";


const servicesContainer = document.querySelector("#services");



const url = "./Resources/services_data.json" ;



async function fetchServices(url) {

    try{
        const res = await fetch(url) ;
    const data = await res.json() ;
    return data ;    
    }catch(error){
        return [] ;
    }
}


const services = fetchServices(url) ;

services.then(
    (arr)=>{

        arr.forEach(({ url ,img} )=> {


            const cart = createNewElement("a") ;
            const image = createNewElement("img") ;
            image.classList.add("cart")

            cart.href = url ;
            image.src = img ;

            cart.append(image) ;

            servicesContainer.append(cart) ;
            
        });

       
        
    }
)
.catch(error => {
    console.error('Error fetching data:', error);
  });