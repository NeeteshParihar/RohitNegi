

/*

after submmiting the form at the endpoint 

http://127.0.0.1:8080/07tute_forms/intro/

it direct us to the below endpoint 

http://127.0.0.1:8080/07tute_forms/intro/?first-name=Neetesh&last-name=Parihar&age=21


there first-name , last-name etc are the attribute values of name  of the input tag in the form 
these attribute called key so last-name is the key and its value is the value of the key 


event.preventdefault() hame  doosre url pe jaane se rok leta hai 


*/


const form = document.querySelector("form") ;


function getTarget(event){
    return event.target ;
}

function getAttribute(element , attribute){
    return element.getAttribute(attribute) ;
}

form.addEventListener("submit" , (event)=>{

    event.preventDefault() ;
    
}
)

// <--------- click event in form ------------->

// form.addEventListener("click", (event)=>{

//     // use event listner to play with form childs

//     const target = getTarget(event) ;
//     const id = getAttribute(target , "id") ;

//     console.log(target) ;
//     console.log(id) ;
//     console.log(getAttribute(target , "placeHolder"))



// })


// <----------- input event in form -------->

// jab bhi form mai input jaye tab event trigger ho jaye 
// form.addEventListener("input" , (event)=>{

//     const target = getTarget(event) ;
//     // console.log(target) ;
//     // const value = getAttribute(target , "value") ; says null bcz we didnt setup value attrubte for it 

//     const value = target.value ;

//     console.log(value) ;

// })



// change event 

// jab -jab another elements select ho and previous mai kuch change aajaye tab event trigger hoga 
// form.addEventListener("change" , (event)=>{

//     const value = getTarget(event).value ;
//     console.log(value) ;



// })



/*



focus event : occurs jab elements get focused by selecting , input etc 

focus does not bubbles 

const input = document.querySelector("input") ;

input.addEventListener("focus" , (event)=>{
    console.log(input.value)
})


there are event which not bubbles , means event does not travels from that element to root 

the events those bubbles --> events travells from target to root irrespect of event listners to the parents




*/


// does not works , it works on input elements those can take input 
// and jab hum input ko select karte hai tab focus event to hota hai 
// par bo form (parent) element tak travel nahi karta 

// form.addEventListener("focus" , (event)=>{
//     console.log(form) ;
// })



// <------------ focusin ------>
// focusin bubbles so event travels from target to root 
// so we can add eventhandler only to the form 
// kyoki form tak event bubble hoke pahuch raha hai 


// it also works for button


/*
focus : which means it becomes the active element and 
is ready to receive user input, usually through the keyboard

*/

form.addEventListener("focusin"  , (event)=>{
    const target = getTarget(event) ;
    console.log("focusin")
    console.log(target) ;

})


// focusout event occurs jab element is lost focused 


form.addEventListener("focusout"  , (event)=>{
    const target = getTarget(event) ;
    console.log("focusout" )
    console.log(target) ;
})





//  start from 20:00 mins 





