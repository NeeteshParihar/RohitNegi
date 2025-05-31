import { createNewElement, getTarget, fetchData } from "../util.js"

const container = document.getElementById("dishes");
const restContainer = document.getElementById("restaurants");

const path = "../Resources/restaurant.json";

function getDishes(data) {

    const dishes = [];
    data.forEach(
        ({ menu }) => {

            menu.forEach(({menuItems , menuCategory})=>{

                menuItems.forEach(({imageUrl , itemName})=>{


                    const dish = {id : dishes.length ,
                        name : itemName ,
                        url : imageUrl ,
                        menuCategory
                    }
                    dishes.push(dish);

                })

            })

        }
    )

    // console.log(dishes[0]);

    return  dishes;
}

function prepareDishCart(dish){

    const {name , url , category} = dish ;

    const div = createNewElement("div");
    div.setAttribute(`data-category`  , category);

    const img = createNewElement("img");
    img.src = url;

    const para = createNewElement("p");
    para.textContent = name ;

    div.append(img , para) ;

    return div ;

}

function prepareRestCart(rest){



}

async function renderDished(path) {

    try {

        const data = await fetchData(path);


        // some of the dishes  
        const res = getDishes(data);

         const dishes = res.slice(0,Math.min(res.length , 10)) ;

         dishes.forEach(dish=>{

            const cart = prepareDishCart(dish);
            container.append(cart) ;

         })



    } catch (err) {
        console.log(err);
    }

}

async function renderTopRest(path){

    try{

        const rest = await fetchData(path);

        const topRest = rest.slice(10);

        console.log(topRest[0]);
        topRest.forEach(rest=>{
            const restCart = prepareRestCart(rest);
            restContainer.appendChild(restCart);

        })

    }catch(err){
        console.log(err);
    }

}

renderDished(path);
renderTopRest(path);


