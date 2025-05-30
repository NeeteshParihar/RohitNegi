
const locationContainer = document.getElementById("location-trigger");
const gpsButton = document.getElementById("gps-button");
const container = document.querySelector(".search-location");


locationContainer.addEventListener("click"  , ()=>{
    container.classList.toggle("hide");
})

gpsButton.addEventListener("click" , ()=>{
    container.classList.toggle("hide");
})

