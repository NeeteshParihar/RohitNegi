
import { createNewElement , getTarget} from "./util.js";


const dishContainer = document.querySelector("#dishes") ;
const dishControllsContainer = document.querySelector(".dishes-container") ;


const dishUrl = "./Resources/dish_data.json" ;


dishControllsContainer.addEventListener("click" , (event)=>{

    const scrollAmount = 200 ;

    const target = getTarget(event) ;

    if(target.tagName != "BUTTON") return ;


    if(target.classList.contains("left-dish")){


        dishContainer.scrollLeft -=scrollAmount ;

    }else{
        dishContainer.scrollLeft +=scrollAmount ;
    }





})


async function fetchDishes(url){

    try{

        const res = await fetch(url) ;
        const data = await res.json() ;
        return data ;
        

    }catch(error){
        console.log("error fethcing data") ;
    }

}

async function displayDishes(dishUrl){
    const dishes = await fetchDishes(dishUrl) ;

    dishes.forEach(({dishImg , dishName})=>{

        const dish = createNewElement("img") ;
        dish.src = dishImg ;
        dish.classList.add("dishImg") ;
        
        const a = createNewElement("a") ;
        a.href = `/food/food.html?category=${dishName}` ;

        a.append(dish) ;

        dishContainer.append(a) ;
    });


    
}


displayDishes(dishUrl) ;






