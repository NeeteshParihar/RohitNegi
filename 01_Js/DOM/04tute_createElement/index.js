
/* 

const newElement = document.createElement("li") ;
newElement.innerText = "TS" ;


const rootContainer = document.getElementById("root") ;

// attach  kardega parent element ke andar at last 
rootContainer.appendChild(newElement) ;

*/

// difference btw append and appendChild 

// suppse we have to append multiple elements then optimal way is to use methods 




function attach(textContent){


    const container = document.getElementById("root") ;
    const newElement = document.createElement("li") ;
    newElement.textContent = textContent ;

    // container.appendChild(newElement ) ; 

    // appendchild only for elements , takes one argument 
    // container.appendChild("hello world") ;

    container.append("hello ") ;

    // ye ek hi baar insert ho raha hai bcz we have to create its copy 
    // container.append(newElement , newElement) ;

    const secondElement = document.createElement("li") ;
    secondElement.innerText =  textContent + "v 2.0" ;

    const clone = newElement.cloneNode("true") ;

    console.log(clone == newElement) ;

    container.append( secondElement , newElement ) ;
    
    // append element can take text nodes , elements nodes 
    // and multiple values 


    // <----pusedo code ------>
    // create element 
    // select parent
    // append 

    const lastElement = container.lastElementChild ;

    console.log(lastElement == newElement) ;

    // it means that jo element create kiya hai bo hi actaully mai append hota hai 
    // na ki uski copy 

    
}


attach("TS") ;
attach("github") ;
attach("react" ) ;


// creating text node 



const newTextNode = document.createTextNode("Neetesh Parihar") ;
const root = document.getElementById("root") ;
root.appendChild(newTextNode) ;
console.log(typeof newTextNode) ;
console.log(newTextNode) ;


// creating attribute node 

const att = document.createAttribute("id") ;
att.value = "first" ;    // id = "first" 

console.log(att) ;
console.log(typeof att) ;


// select and attach the attribute 
const firstLi = document.querySelector("li") ;
firstLi.setAttributeNode(att) ;



console.log(firstLi) ;
console.log(document.getElementById(att.value)) ;


// selectring all the childs 

const temp1 = document.getElementById("root") ;

// nodeList 
// console.log(temp1.childNodes) ;

// html collection 
console.log(temp1.children) ;

console.log(temp1.children[1]) ;




