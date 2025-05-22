

const heading = 
document.querySelector("h1") ;

heading.style.display = "none" ;


setTimeout(() => {
    console.log("innerText:", heading.innerText);     // will be empty
    console.log("textContent:", heading.textContent); // still has full text
  }, 0);









  






