import { createNewElement, getTarget, fetchData } from "../util.js"

const container = document.getElementById("dishes");

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

    console.log(dishes[0]);

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

async function renderDished(path) {

    try {

        const data = await fetchData(path);

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


renderDished(path);
