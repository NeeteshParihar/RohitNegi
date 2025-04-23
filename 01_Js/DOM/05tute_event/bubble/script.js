

function getColor(){
const red = Math.floor( 1 +Math.random()*254 ) ;
const green = Math.floor( 1 +Math.random()*254 ) ;
const blue = Math.floor( 1 +Math.random()*254 ) ;

const color = `rgb(${red},${green},${blue})` ;

return color ;

}

const funnyMessages = [
    "Yo",
    "Sup",
    "Howdy",
    "Hola",
    "Boop",
    "Meow",
    "Oof",
    "Yikes",
    "Wassup",
    "Ahoy"
  ];
  

function getIndex(funnyMessages){
    return Math.floor(Math.random()*funnyMessages.length) ;
}  

function getMessage(funnyMessages){    
    return funnyMessages[getIndex(funnyMessages)] ;
}


document.addEventListener("click" , (event)=>{

    const x = event.clientX -25  ;
    const y = event.clientY - 25 ;


    const newDiv = document.createElement("div" );
    newDiv.innerHTML = getMessage(funnyMessages) ;
    newDiv.className = "circle" ;
    newDiv.classList.add("no-select") ;
    // newDiv.classList.add("circle")

    newDiv.style.backgroundColor = getColor() ;

    document.body.append(newDiv) ;

    newDiv.style.left = `${x}px`;
    newDiv.style.top = `${y}px`;


    setTimeout(()=>{
        newDiv.remove();
    } , 5000) ;
 
})