

const weightContainer = document.querySelector(".weight");
const heightContainer = document.querySelector(".height");
const button = document.querySelector(".calculate-button");
const resultPara = document.querySelector(".result") ;
const form = document.querySelector("form") ;
const categoryContainer = document.querySelector(".category") ;




function getInputValue(container){
    return container.value ;
}

function clearInput(container){
    container.value = "" ;
}


form.addEventListener("submit" , (event)=>{

    event.preventDefault() ;


})

button.addEventListener("click" , ()=>{

    const wt = getInputValue(weightContainer);
    const ht = getInputValue(heightContainer); 

    if(!wt || !ht) return ; // also returns on value == 0 

    const height = Number(ht)*0.3048 ; // convert feet into meters 
    const weight = Number(wt) ;

    const ans = weight/(height*height) ;

    resultPara.innerHTML = `BMI score : ${ans} kg/m<sup>2</sup>` ;

    let category = "underweight" ;

    if(ans >= 18.5 && ans <= 24.9){
        category = "Healthy weight" ;
    }else if( ans >= 25.0 && ans <= 29.9){
        category = "Overweight" ;
    }else{
        category = "obesity" ;
    }

    categoryContainer.innerHTML = `${category}`
    
})






















