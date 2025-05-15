

import { createNewElement, getTarget, fetchData } from "./util.js";

const scroller = document.querySelector(".Dineut-scroller ");
const itemsContainer = document.querySelector("#DineutItems");

const dineutUrl = "./Resources/Dineuts_data.json";

async function renderDineut(url) {

    const dataArray = await fetchData(url);
    console.log("hello res");
    console.log(dataArray);

    dataArray.forEach((item) => {

        const parentContainer = createNewElement("div");
        parentContainer.classList.add("dineuts");

        const child1 = createNewElement("div");
        child1.classList.add("dineut-cart-img");

        const img = createNewElement("img");

        const ratingAndTag = createNewElement("div");
        ratingAndTag.classList.add("ratingAndTag")


        const { imgOfRestaurant, tag, rating } = item;

        img.src = imgOfRestaurant;

        const tagCont = createNewElement("div");
        tagCont.innerHTML = tag;

        const ratingCont = createNewElement("div");
        ratingCont.innerHTML = rating;


        ratingAndTag.append(tagCont, ratingCont);

        // insert image container and rating, tagName 
        child1.append(img, ratingAndTag);



        const { tableBookingPrice, type } = item;

        const child2 = createNewElement("div");
        child2.classList.add("type");

        const locationCont = createNewElement("span");
        locationCont.innerHTML = `${type.originA}.${type.originB}`;

        const priceCont = createNewElement("span");
        priceCont.innerHTML = tableBookingPrice;

        child2.append(locationCont, priceCont);

        const {
            venue: {
                address, distance
            } } = item;


        const child3 = createNewElement("div");
        child3.classList.add("venue");

        const addressCont = createNewElement("div");
        addressCont.innerHTML = address;

        const distanceCont = createNewElement("div");
        distanceCont.innerHTML = distance;

        child3.append(addressCont, distance);

        // <---------------offerings---------->

        const { offerings } = item;

        const child4Offerings = createNewElement("div");
        child4Offerings.classList.add("offerings");

        offerings.forEach((offer) => {

            const offerCont = createNewElement("div");
            offerCont.textContent = offer;

            child4Offerings.append(offerCont);
        })


        const { offers, bankOffers } = item;

        const buttonOffer1 = createNewElement("button");
        buttonOffer1.classList.add("restaurants-offers");

        let offer =
            offers[0] || "visit restaurant";
        let othersOffers =
            (offers.length > 1) ? `+ ${offers.length - 1} more` : "";

        const offer1Cont = createNewElement("div");               

        offer1Cont.innerHTML = offer ;      

        const offer2Cont = createNewElement("div");
        offer2Cont.textContent = othersOffers;



        buttonOffer1.append(offer1Cont, offer2Cont);


        const buttonBankOffer = createNewElement("button");
        buttonBankOffer.classList.add("bank-offers");

        offer =
            bankOffers[0] || "visit restaurant";

        othersOffers =
            (bankOffers.length > 1) ? `+ ${bankOffers.length - 1} more` : "";

        const bankOffer1Cont = createNewElement("div");

       
        bankOffer1Cont.textContent = offer;
   



        const bankOffer2Cont = createNewElement("div");
        bankOffer2Cont.textContent = othersOffers;

        buttonBankOffer.append(bankOffer1Cont, bankOffer2Cont)


        parentContainer.append(child1, child2, child3, child4Offerings, buttonOffer1, buttonBankOffer);

        itemsContainer.append(parentContainer);
    });

}

renderDineut(dineutUrl);


scroller.addEventListener("click", (event) => {

    const target = getTarget(event);
    if (target.tagName != "BUTTON") return;
    const scrollAmount = 600;

    console.log(target);

    if (target.classList.contains("left-dineut")) {
        console.log("left");
        itemsContainer.scrollLeft -= scrollAmount;
    } else {
        console.log("right");

        itemsContainer.scrollLeft += scrollAmount;
    }

})
























