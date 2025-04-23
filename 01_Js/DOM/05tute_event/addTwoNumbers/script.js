

const num1Container = document.querySelector(".num1");
const num2Container = document.querySelector(".num2");
const addButton = document.querySelector("button");
const resultPara = document.querySelector("p");


function getInputValue(container) {
    return container.value;
}

function clearInput(container) {
    container.value = "";
}



addButton.addEventListener("click", () => {

    const num1 = getInputValue(num1Container);
    const num2 = getInputValue(num2Container);

     
    // anything from the input is treated as the string 
    console.log(typeof num1) ;

    // console.log(num1 === "", num2 )  ; input containes value as a string 


    if (!num1 || !num2) {
        return;
    }


    resultPara.classList.add("show") ;  

    const ans = Number(num1) + Number(num2);
    resultPara.innerHTML = `${num1} ${num2 < 0 ? "" : "+"} ${num2} = ${ans}`;

   

})
