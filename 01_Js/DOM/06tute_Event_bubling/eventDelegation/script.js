

// event delegation :
// it a technique in which  one event listner added to parent  instead of multiple listners for each child  to handle events on the childs


const body = document.querySelector("body");
const buttons = document.querySelectorAll("button"); // returns nodeList 
const container = document.querySelector(".container");

function getBgColor(button) {
    return button.dataset.color;
}

function getTarget(event) {
    return event.target;
}

buttons.forEach((button) => {
    button.style.backgroundColor = getBgColor(button);
})


function getRandomColor(){
  
    const red = Math.floor(Math.random()*244 + 1) ; // ading 1 avoids 0 
    const green = Math.floor(Math.random()*244 + 1) ; 
    const blue = Math.floor(Math.random()*244 + 1) ; 

    const color = `rgb(${red},${green},${blue})` ;

    return color ;

}

container.addEventListener("click", (event) => {
    const target = getTarget(event);
    console.log(target);

    // agar - bo elements click hur jinme dataset.color undefined ho 
    // then us case ko handle karna padega 

    const color = getBgColor(target) || getRandomColor();

    console.log(color);

    body.style.backgroundColor = color;

})





