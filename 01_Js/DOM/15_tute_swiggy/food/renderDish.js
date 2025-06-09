import { createNewElement, getTarget, fetchData } from "../util.js"


const container = document.getElementById("dishes");
const restContainer = document.getElementById("restaurants");

const path = "../Resources/restaurant.json";

function getDishes(data) {

    const dishes = [];
    data.forEach(
        ({ menu }) => {

            menu.forEach(({ menuItems, menuCategory }) => {

                menuItems.forEach(({ imageUrl, itemName }) => {


                    const dish = {
                        id: dishes.length,
                        name: itemName,
                        url: imageUrl,
                        menuCategory
                    }
                    dishes.push(dish);

                })

            })

        }
    )

    // console.log(dishes[0]);

    return dishes;
}

function prepareDishCart(dish) {

    const { name, url, category } = dish;

    const div = createNewElement("div");
    div.setAttribute(`data-category`, category);

    const img = createNewElement("img");
    img.src = url;
    img.setAttribute("loading", "lazy");

    const para = createNewElement("p");
    para.textContent = name;

    div.append(img, para);

    return div;

}


/* 
    
    "restaurantId": 0,
    "restaurantPoster": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_900/COLLECTIONS/IMAGES/MERCH/2024/8/20/60f66049-cfcc-4f0b-891f-624938aac2bc_Pizza%20(6).png",
    "restaurantName": "KFC",
    "avgRating": 3.5,
    "timeToDeliver": {
        "minTime": 28,
        "maxTime": 44
    },
    "categories": [
        "Snacks",
        "Ice Cream",
        "Wraps",
        "Desserts"
    ],
    "address": "8780 Glenn Shore",
    "offer": 35,
    "price": {
        "minPrice": 124,
        "maxPrice": 500
    },
    "isVeg": "non-veg",
    "distance": 8.9,
     */


function prepareRestCart(rest) {

    // parent cart  
    const cart = createNewElement("div");
    cart.classList.add("restaurant-cart");

  

    const upperCart = createNewElement("div");
    upperCart.classList.add("upperCart");

    const lowerCart = createNewElement("div");
    lowerCart.classList.add("lowerCart");

    // <-------------------upperCart--------------->

    const poster = createNewElement("img");
    poster.src = rest.restaurantPoster;
    poster.setAttribute("loading", "lazy");
    poster.classList.add("poster");

      //  <div class="overlay"></div> <!-- 👈 new overlay -->

    const overlay = createNewElement("div");
    overlay.classList.add("overlay");
    

    const offerContainer = createNewElement("p");
    offerContainer.textContent = `${rest.offer}% Off`;
    offerContainer.classList.add("offer");

    upperCart.append(poster,overlay , offerContainer);

    // <----------- lowerCart-------------------->

    // ratName container 
    const restName = createNewElement("div");
    restName.textContent = rest.restaurantName;
    restName.classList.add("name");

    // rating container 
    const ratingAndTime = createNewElement("div");
    ratingAndTime.classList.add("rating-and-Time");

    const icon = createNewElement("span");
    icon.classList.add("star" , "fas" , "fa-star" );
    const rating = createNewElement("span");
    rating.textContent = rest.avgRating;
    rating.classList.add("rating") ;

    const dot = createNewElement("span");
    dot.textContent = "•"; // or "." or 
    dot.classList.add("dot");

    const time = createNewElement("span");
    time.textContent = `${rest.timeToDeliver.minTime}-${rest.timeToDeliver.maxTime} mins`;
    time.classList.add("time");
    ratingAndTime.append(icon, rating, dot, time);

    // cuisines container 
    const cuisines = createNewElement("div");
    cuisines.classList.add("cuisines");

    const categs = rest.categories.slice(0, 3);

    categs.forEach((categ, index ) => {
       
       cuisines.textContent += `${categ}`;

       if(index < categs.length-1){
       cuisines.textContent += `, `;

       }

       
    });

    if (rest.categories.length > 3) {
       cuisines.textContent += `, ${rest.categories.length - categs.length} more`;
    }

    // addressContainer 
    const address = createNewElement("div");
    address.textContent = rest.address;
    address.classList.add("address");

    lowerCart.append(restName, ratingAndTime, cuisines, address);

    // insert upperCart and lowerCart 
    cart.append(upperCart, lowerCart);

    return cart;



}

async function renderDished(path) {

    try {

        const data = await fetchData(path);


        // some of the dishes  
        const res = getDishes(data);

        const dishes = res.slice(0, Math.min(res.length, 10));

        dishes.forEach(dish => {

            const cart = prepareDishCart(dish);
            container.append(cart);

        })



    } catch (err) {
        console.log(err);
    }

}

async function renderTopRest(path) {

    try {

        const rest = await fetchData(path);

        const topRest = rest.slice(0 ,10);


        topRest.forEach(rest => {
            const { menu, ...restData } = rest;
            const restCart = prepareRestCart(restData);
            restContainer.appendChild(restCart);

        })

    } catch (err) {
        console.log(err);
    }

}

renderDished(path);
renderTopRest(path);


