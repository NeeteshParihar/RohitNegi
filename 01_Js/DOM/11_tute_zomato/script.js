
import { foodItems, dineutsRestaurants, instamatItems } from "./items.js";




const container = document.getElementById("container");



const params = new URLSearchParams(window.location.search);

const category = params.get("category");

function getTarget(event) {
    return event.target;
}





console.log(category);

const categories = {
    food: "food",
    instamat: "instamat",
    restaurants: "restaurants"
}


function creatNewElement(tagName) {
    return document.createElement(tagName);
}

function renderFood(foodItems) {

    container.innerHTML = "";

    foodItems.forEach((item) => {

        const { name, price, rating } = item;

        const para1 = creatNewElement("p");
        para1.innerHTML = name;
        para1.className = "name";

        const para2 = creatNewElement("p");
        para2.innerHTML = price;
        para2.className = "price";


        const para3 = creatNewElement("p");
        para3.innerHTML = rating;
        para3.className = "rating";

        const a = creatNewElement("a") ;
        a.href = "?category=instamat" ;
        a.innerHTML = "instamat" ;


        const newDiv = creatNewElement("div");
        newDiv.className = "cart";
        newDiv.append(a ,para1, para2, para3);

        container.append(newDiv);




    });


}
function renderInstamat(instamat) {
    container.innerHTML = "";

    instamat.forEach((item) => {
        const { name, deliveryTime, price } = item;

        const para1 = creatNewElement("p");
        para1.innerHTML = name;
        para1.className = "name";

        const para2 = creatNewElement("p");
        para2.innerHTML = deliveryTime;
        para2.className = "delivery-time";

        const para3 = creatNewElement("p");
        para3.innerHTML = price;
        para3.className = "price";

        const newDiv = creatNewElement("div");
        newDiv.className = "cart";
        newDiv.append(para1, para2, para3);

        container.append(newDiv);
    });
}

function renderRestaurants(restaurants) {
    container.innerHTML = "";

    restaurants.forEach((item) => {
        const { name, rating, address } = item;

        const para1 = creatNewElement("p");
        para1.innerHTML = name;
        para1.className = "name";

        const para2 = creatNewElement("p");
        para2.innerHTML = rating;
        para2.className = "rating";

        const para3 = creatNewElement("p");
        para3.innerHTML = address;
        para3.className = "address";

        const newDiv = creatNewElement("div");
        newDiv.className = "cart";
        newDiv.append(para1, para2, para3);

        container.append(newDiv);
    });
}

function render404() {
    container.innerHTML = "";

    const newDiv = creatNewElement("div");
    newDiv.innerHTML = "404 cateogry not found!";

}


if (category === categories.food) {

    renderFood(foodItems);

} else if (category === categories.instamat) {

    console.log(instamatItems);

    renderInstamat(instamatItems);

} else if (category === categories.restaurants) {

    renderRestaurants(dineutsRestaurants);

} else {
    render404();
}