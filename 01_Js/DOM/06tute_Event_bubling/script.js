

const body = document.querySelector("body") ;
const buttons = document.querySelectorAll("button") ;

function getId(element){
    return element.id ;
}

buttons.forEach((button , index )=>{

    // console.log(button.getAttribute("id")) ;
    // // or 
    // console.log(button.id ) ;

    console.log("event handler added at each button")

    button.addEventListener("click" , ()=>{
        const color = getId(button) ;
        body.style.backgroundColor = color ;
    })

    if(index >= buttons.length-1) return ;

    const newspan = document.createElement("span") ;
    button.insertAdjacentElement("afterend" , newspan) ;
    newspan.classList.add("styler") ;


})


// the no. of event listners increases with increase in number in the buttons 
// so this is not optimal code 


