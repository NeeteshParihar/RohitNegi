// selecting elements

// using css selectors

//1.querySelector --> returns the first element matching the css selector
//2. querySelectorAll --> returns static node list of elements matching the css selector

const byID = document.querySelector("#first");
const byClass = document.querySelector(".header1");
const byTag = document.querySelector("h1");

console.log(byID);
console.log(byClass);
console.log(byTag);

const vals = document.querySelectorAll(".header1");

console.log(vals); // nodeList

// nodeList : returned by querySelectorAll , childNodes
// htmlCollection : return by geElementTag , geElementClassName , children

// nodeList and htmlCollection are nearly same but are different and not array
// we can convert them into array

console.log(Array(vals)); // single NodeList object

for (let i = 0; i < vals.length; i++) {
  vals[i].style.color = "blue";
}

// can be used in html collections
for (let val of vals) {
  val.style.color = "skyblue";
}

// exist in nodeList but not in htmlCollection

vals.forEach((val) => {
  val.style.color = "purple";
});

// convert nodeList  into Array

const arr = Array.from(vals);

console.log(arr);

for (let val of arr) {
  console.log(val);
  val.style.color = "skyblue";
}

// difference btw static vs live dom

// statis meanselect karte time jo state hogi elements ki bo bahi ranhegi change nahi hogi : will not update with changes

const li1 = document.querySelectorAll("li");
console.log("static");

console.log("length before update", li1.length);

const newLi = document.createElement("li");
newLi.style.color = "red";
newLi.innerText = "hello world";
document.querySelector("ul").appendChild(newLi);

console.log("length after update", li1.length);

// new li append karne par li1 ki length nahi badhi so it does'nt update with changes

// live

const li2 = document.getElementsByTagName("li");

console.log("live");

console.log("length before update", li2.length);

const newli2 = document.createElement("li");
newli2.innerText = "hello palton";
newli2.style.color = "green";
document.querySelector("ul").appendChild(newli2);

console.log("length after update", li2.length);

// selecting  just first element

{
  console.log("block code1");

  const li = document.querySelector("ul li");

  console.log(li);

  const lis = document.querySelectorAll("ul li");

  console.log(lis);

  const li3 = document.querySelector("ul").querySelectorAll("li");

  console.log(li3);
}

{
  // returns live collections of elements means the val will be updated as these tags changes

  const tags = document.getElementsByTagName("h1");
  console.log(tags);

  // html collection is also iterative

  for (let val of tags) {
    console.log(val);
  }

  for (let i = 0; i < tags.length; i++) {
    console.log(tags[i]);
  }

  // converting it into Array

  const arr = Array.from(tags);

  console.log("after conversion");

  for (let val of arr) {
    console.log(val);
  }

  // whenever we modify the css directly from the js , css injected as the inline css
  // try to print element after using style property on it
}

{
  // accessing via relationship
  // 1. accessing imediate parent , accessing child elements , first and last child elements

  //1.select li , then slect parent

  const li = document.querySelector("li");
  console.log(li);

  console.log("parent element of li");

  console.log(li.parentElement);
  console.log(li.parentNode);

  // differnce btw parentNode and parentElement is that
  // parentNode gives parentNode even if the parent is not the element  if there no parent then it gives null
  // parentElement gives parent Element when parent is an element otherwise it gives null

  const textNode = document.querySelector("ul").firstChild;

  console.log(textNode);
  console.log(typeof textNode);

  console.log("hello");
  console.log(document.querySelector("html").parentElement); // null bcm html has no element as parent
  console.log(document.querySelector("html").parentNode); // returns document bcz it  document is parent of html

  console.log(document.childNodes);

  console.log(document.childNodes[0]);
  console.log(document.childNodes[1]);

  document.querySelector("ul").childNodes.forEach((val) => {
    console.log(val);
  });
  
  
  console.log(document.querySelector("ul").children) ; // children gives us only element childs 

  const first = document.querySelector("ul").firstElementChild ;

  console.log("first child")  ;   
  console.log(document.querySelector("ul").firstChild) ;

  console.log("firstElementchild") ;  // can only be html element 
  console.log(first) ;

  // sperate node is created for the text 

  // childNodes : return karta hai elment plus text plus empty space btw two elements 

  // html collection can only have elements 
  // nodeList can have elments as well as text nodes 

  console.log(document.querySelector("ul").lastElementChild ) ;
  console.log(document.querySelector("ul").lastChild ) ; 


  // sibling 

  const ul = document.querySelector("ul").querySelectorAll("li") ;


  console.log("sibling nodes") ;
  console.log(ul[0].nextSibling) ; // returns the  text node 
  console.log(ul[1].previousSibling) ;

  console.log("sibling elements") ;

  console.log(ul[0].nextElementSibling) ;
  console.log(ul[1].previousElementSibling) ;


  // important
  // innerText property  bo text show karti hai jo display ho rahi ho screen par , display none agar karde to bo display nahi hoga text 

  const temp = document.createElement("li") ;
  li.textContent = "hello it new duniya" ;
  li.style.display = "none" ;

  document.querySelector('ul').appendChild(temp)  ; 

  console.log(temp.innerText) ;
  console.log(temp.textContent) ;
  console.log(temp.innerHTML) ;


}
