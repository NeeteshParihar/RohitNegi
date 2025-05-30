
const root = document.getElementById("root");

// const h1 = React.createElement("h1" , {} , "Hello welcome to the react"); // element with react  // its a differnt object then what we usalyy create  and can only be rendered as tag using react dom 

// console.log(h1) ;

// problem
// ReactDOM.render(h1 , root) ; // rendering with react 


// const h2 =document.createElement("h2");  // its broser dom way of rendering 
// h2.textContent = "i am h2";
// root.append(h2);


// new way of rendering 

const rootContainer = ReactDOM.createRoot(root) ;
const element = React.createElement("h1" , {}  , "hello welcome to react");
rootContainer.render(element);

const box = document.getElementById("box");

const boxContainer = ReactDOM.createRoot(box) ;
boxContainer.render(element);







