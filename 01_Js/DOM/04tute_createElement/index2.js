
// acessing the attribute
// select the element and use getAttribute() on it 
// for settting use setAttribute() on it 
// for removing attrbute use removeAtribute("name")


const temp = document.getElementById("root") ;

// attribute ki jo value hogi bo return ho jaegi 
console.log(typeof temp.getAttribute("id")) ;
console.log(temp.getAttribute("class")) ;

// setting the attrbutes 

// agar attrbute hoga to ovewrite kar dega else make a new attribute 
temp.setAttribute("class" , "newContainer") ;
console.log(temp.getAttribute("class")) ;

// custom attributes 
temp.setAttribute("custom" ,  20) ;
console.log(temp.getAttribute("custom")) ;


// Removing the attribute 
temp.removeAttribute( "custom" ) ;
console.log(temp.getAttribute("custom")) ;

// jab attribute hota nahi hai tab uski value null aati hai 


temp.setAttribute("name" , null) ;
console.log(temp.getAttribute("name") )  ; 
console.log(temp.getAttribute("name") == null) ;  // false bcs "null" != null



// <----------------adding nodes ----------->

// adding at first position or as a first child  
// prepand() 

const rootContainer = document.getElementById("root") ;
const newElement1 = document.createElement("li") ;
newElement1.innerHTML = "DSA" ;

root.prepend(newElement1) ;

// adding just before an Element 

// 1.get the element  to which have to insert just bfr

const element2 = document.createElement("li") ;
element2.innerHTML = "python" ;

const childElement2 = rootContainer.children[1] ;
root.insertBefore(element2 , childElement2) ;

// replacing the child2Element with a new element 
// to replace access its parent first 

const element3 = document.createElement("li") ;
element3.innerHTML = "new html" ;

// childElement2  ki place par element3  insert karna hai 
rootContainer.replaceChild(element3 , childElement2) ;

console.log(typeof rootContainer.innerHTML) ; // string 

// another way to modify the html 

rootContainer.innerHTML += `<li>Hello new element </li>` ;

/*

there are more ways to add an element 

// format targetElement.insertAdjacentElement("keyword" , createdElement) ;

// below are keywords 
1. beforebegin  : before element iteself 
2. afterbegin  : inside element , sabse pehle 
3 . beforeend : inside element , sabse last mai 
4 . afterend : just after the element 


*/

const element4 = document.createElement("div");
element4.innerHTML  = "hello new container" ;

//1 beforeBegin 

// rootContainer.insertAdjacentElement("beforebegin", element4) ;
// rootContainer.insertAdjacentElement("afterbegin" , element4) ;

// rootContainer.insertAdjacentElement("beforeend" , element4) ;

rootContainer.insertAdjacentElement("afterend" , element4) ;


// <-------------Removing an element ---------------->
// select and call remove method 

element4.remove() ;
rootContainer.children[0].remove() ;

// remving text nodes 

function isTextNode(node){
    return node.nodeType == 3 ; 
    // element node as nodeType == 1 
}


const element5 = document.createTextNode("hello temp") ;
console.log(isTextNode(element5)) ;
element5.remove() ;  // deletes node when it is attached to a parent in the dom 
console.log(element5) ;

// const greatParent = document.querySelector("html") ;
// greatParent.remove() ;



rootContainer.childNodes.forEach((node)=>{
    isTextNode(node)  && node.remove() ;
})

const garbage = rootContainer.children[0].remove() ;
console.log(garbage) ; // remove method does not return any value means it returns undefiend 


// remove()  method is used to remove the node from the dom 

// removechild()

// it is used to remove the node from the dom 
// select parent , select child use removechild method , it also returns the removed node 

const child5 = rootContainer.children[0] ;

console.log(child5) ;

const ans = rootContainer.removeChild(child5) ;

console.log(ans) ;


// usefull when need to take it from one place and insert in a different place 



