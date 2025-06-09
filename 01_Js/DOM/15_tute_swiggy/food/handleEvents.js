

import { createNewElement, getTarget, fetchData } from "../util.js"

const File1 = { 

    dishes: document.getElementById("dishes"),
    controls : document.querySelector(".dish-controller"),
    restaurants : document.querySelector("#restaurants"),
    restControls : document.querySelector(".restaurant-controller"),

    handleScrolling() { 

        console.log(this.controls);

        const scrollAmount = 600 ;

        this.controls.addEventListener("click", (event) => {

            const target = getTarget(event);

            if(target.tagName !== "BUTTON") return ;

            if(target.classList.contains("left-dish")){

                this.dishes.scrollLeft -= scrollAmount ;

            }else{
                this.dishes.scrollLeft += scrollAmount ;

            }



        })



        this.restControls.addEventListener("click", (event) => {

            const target = getTarget(event);

            if(target.tagName !== "BUTTON") return ;

            if(target.classList.contains("left")){

                this.restaurants.scrollLeft -= scrollAmount ;

            }else{
                this.restaurants.scrollLeft += scrollAmount ;

            }



        })

    }

}

File1.handleScrolling();