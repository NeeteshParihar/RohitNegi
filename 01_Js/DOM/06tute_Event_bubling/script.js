

const body = document.querySelector("body") ;
const buttons = document.querySelectorAll("button") ;

function getId(element){
    return element.id ;
}

buttons.forEach((button)=>{

    // console.log(button.getAttribute("id")) ;
    // // or 
    // console.log(button.id ) ;

    button.addEventListener("click" , ()=>{
        const color = getId(button) ;
        body.style.backgroundColor = color ;
    })

})


// the no. of event listners increases with increase in number in the buttons 
// so this is not optimal code 


