
// event : activities jo webapps mai hoti hai ex : clicking a button 
// hum is event par kuch karna chahenege called event handling 


// events : click , dblclick , mousemove  , mouseover


const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const container3 = document.querySelector(".container3");
const container4 = document.querySelector(".container4");

const button = document.querySelector("button") ;


function getColor() {

    const red = Math.floor(Math.random() * 255 + 1);
    const green = Math.floor(Math.random() * 255 + 1);
    const blue = Math.floor(Math.random() * 255 + 1);

    const color = `rgb(${red} , ${green} , ${blue})`;
    return color;

}

container1.addEventListener("dblclick", () => {
    container1.style.backgroundColor = getColor();
})


container2.addEventListener("mousemove", () => {
    container2.style.color = getColor();
})

container3.addEventListener("mouseover", () => {

    container3.style.backgroundColor = getColor();


})

// keyword eventListners 
// keydown  : jaise hi key dabaenge to event trigger ho jayega
// keyup    : jaise hi ki daba ke release karenge to event trigger ho jayega 

// add event listener when any key get pressed 

// document.addEventListener("keydown", (event) => {

//     console.log(event);
//     console.log(event.key);  // jo key pressed ki hai bo lelo
//     container2.style.fontSize = `${Math.floor(Math.random() * 25 + 14)}px`;


// })

function getFontSize(box) {

    const value = window.getComputedStyle(box).fontSize;
    console.log(parseFloat(value));
    return parseFloat(value);
}

document.addEventListener("keydown", (event) => {

    const fontSize = getFontSize(container1);
    console.log("fontsize : ", fontSize);

    if (event.key == "ArrowUp") {

        container1.style.fontSize = `${fontSize + 5}px`;

    } else if (event.key == "ArrowDown") {
        container1.style.fontSize = `${fontSize - 5}px`;

    }

    // event.target batata hai ke event kaha trigger hua hai 

    console.log(event) ;
    console.log(event.target) ;

})


document.addEventListener("keyup" , (event)=>{
    console.log(`key release : ${event.key}`) ;

    container2.style.color = getColor() ;
})


// event object : 20:00


// event object ke pass event ki saari information rehti hai  


// jab click event trigger hoga is button / element aur then callback function execute hoga jisko by default event object pass kiya jata hai 
button.addEventListener("click" , (event)=>{

    // click is a pointer event 

    console.log("button is clicked")
    console.log(event) ;
    console.log(event.target) ;
    console.log( "event type is : " ,  event.type) ; // click 
    console.log(`(${event.clientX} , ${event.clientY})`) ;

    // clientX : left se x-axis mai kaha click kiya hai
    // clientY : top  se y-axis mai kaha click kiya hai  

    

})

container4.addEventListener("click" , (event)=>{
    console.log(event) ;
    console.log(event.target) ;
})