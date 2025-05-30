const str = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/3/13/0d2bc762-c414-48fa-8315-9fec71a6dbf0_519580.JPG"


function isValidImg(str){
    return str.slice(0,5) === "https";
}

console.log(isValidImg(str));