
import express from "express";
import fs from "fs";
import path from "path" ;

const app = express();
const PORT = 5008;
const hostname = "localhost";
const relativePath = path.join("./" , "booksData.json");



app.use(express.json()); 

function getBookStore(path){

    try{

        const res = fs.readFileSync(path ,'utf-8');
        const bookStore = JSON.parse(res) ;        
        return bookStore ;


    }catch(err){

        
        // if(err.code === "ENOENT"){
        //     return {status:404}; // file or directory not found // but fontend should not know about these 
        // }

        return {books:[] , id : '0'};
    }

}

function makeBookStore(bookStore){
    return JSON.stringify(bookStore);
}

function storeBookStore(path , bookStore){

    try {

        bookStore = makeBookStore(bookStore);
        fs.writeFileSync(path , bookStore );

        return {status : 201}; // book created  succeccfully 

    } catch (err) {
        return {status : 500 , err }; // internal server error        
    }

}

function getBooks(bookStore){
    return bookStore.books ;
}

function getID(bookStore){
    return parseInt(bookStore.id);
}


/* 

    writing middlewares  
    middlewares --> app.use(routepath , ...handlers ) --> we can pass as many as handlers(callback func) 
     to call the next handlers use "next" parameter which calls the next handler,
     it can handler any type of http request like get , put , patch delete and others if route of middleware same as prefix of the request 
     ex : /bookStore/book --> middleware --> /bookStore can handle the request 

*/


// what happens when client sends multiple request or waits for the request response 
// app.get("/user" , (req , res)=>{

// })

// in this apan second callback ko execute nahi kara skte 

// app.use('/books' , (req , res )=>{

//     console.log("fn1");
//     res.send("i am middleware");

// } ,(req , res)=>{

//     console.log("i am fn2");
//     res.send("i am fn2 frm mddlwr")

// }



// )

let obj = null ;
let obj2 = null ;
let obj3 = null ;


// the req and res object are not copied but shared to the next handler  // that means there inner content will be ther same 

app.use("/users/:id" , (req , res , next)=>{

    console.log(req.params);
    console.log(req.query);
    console.log("first");

    obj = req ;
    obj2 = res ;
    obj3 = next ;

    // console.log(next);

    req.params.id = "name" ;
    // req.query = {name : "neetesh"}; error 

    req.query.id ="neetesh";
    req.query.age = "21";

console.log(Object.isFrozen(req.query));   // true or false
console.log(Object.isFrozen(req.params));  // true or false

    // req = {};  i am creating an empty obj and pointing to that and req and response remains intact 

    next() ;
},(req , res , next )=>{
    console.log(req.params);
    console.log(req.query);

    console.log(obj == req );
    console.log(obj2 == res);
    console.log(obj3 == next);

    console.log("second");
    res.send("i am middleware");
})


// handlers recieves fresh  copy of req , res  and next 

app.use("/books/:id", (req, res, next) => {
    console.log("=== FIRST MIDDLEWARE ===");
    console.log("Original params:", req.params);
    console.log("Original query:", req.query);

    // Attempt to modify both
    req.params.id = "changedId";
    req.query.newKey = "newValue";

    console.log("Modified params:", req.params);
    console.log("Modified query:", req.query);

    res = {} ;

    next();
}, (req, res) => {
    console.log("=== SECOND MIDDLEWARE ===");
    console.log("Params now:", req.params);
    console.log("Query now:", req.query);
 
    res.send({
        params: req.params,
        query: req.query
    });
});


// the callback called as route handlers or handlers 
// define a middleware for route "/chatgpt" with tree handlers 
// app.use("/chatgpt" , (req , res , next)=>{

//     console.log("first");
//     next(); /// basics js next will call next handler and after execution below code gets executed 
//     console.log("first-last");

// }, (req , res , next)=>{

//     console.log("second");
//     next();

// }, (req , res , next)=>{

//     console.log("third");
//     // res.send("i am third");

//     next() ; // its telling that now the request can go to the routes like app.get()

// })


/* 

jo humne handlers ek sath pass kiye hai unhe hum alag alag karke bhi likh kste hai 
below is the example 

 */

// jab bhi request is url par aaye to is event handler ko use karna 
app.use("/chatgpt/user" , (req , res ,next)=>{

    console.log(`${new Date()} , ${req.method } , ${req.url}`);  // req.url gives me ?name=neetesh not this part /chatgpt/user
    console.log("1");
    next();
})

// request of /chatgpt/user is handledny /chatgpt 
app.use("/chatgpt" , (req , res , next)=>{
    console.log("2");
    next();
})

app.use("/chatgpt" , (req , res , next)=>{

    res.send("this method is cool and sexy");

})


let newObj1 = null ;
// we can pass handlers in arr [h1  , h2 ...] , hn1 , hn2 ... some are out 
app.get("/chatgpt" , (req , res , next)=>{
    
    // res.send("hello i am chatgpt");
    console.log("hello get request");
    // res = {};
    newObj1 = req ;

    next() ;
} , (req , res)=>{
    res.send("what the hell");
})

app.get("/chatgpt" , (req , res)=>{
    console.log(req == newObj1); // true 
    res.send("i am chatgpt");
})

app.get('/books' , (req , res)=>{

    // console.log(books);

    console.log(req.url); // give me /books 
    const {books} = getBookStore(relativePath);
    res.status(200).send(books);

})


// url endpoint like --> /book?name=the rain in the space&year=2008...
app.get("/book", (req , res)=>{

    const constrant = req.query ;  // query parameter can be undefined {id:undefined} in case of /books?id&name=..
    const {books  , id } = getBookStore(relativePath);

    if(books.length == 0) res.status(200).send([]);

    const instance = books[0] ; // for verifying attribute or properties 

    let ans = books ;

     

    for(let prop in constrant){

        if(!constrant[prop] ) continue ;
        if(!instance.hasOwnProperty(prop)){
             res.status(404).send("such source does  not exit")
             return ;
        }
        ans = ans.filter((book)=> String(book[prop] ).toLocaleLowerCase() === constrant[prop].toLocaleLowerCase()  );

      console.log(ans);


    }

    res.status(200).send(ans);
})

app.post('/book' , (req , res)=>{


    let {body:book} = req ;
    let {books , id } = getBookStore(relativePath);  

    book = { id: 1+parseInt(id) , ...book}; 

    books.push(book);
    id = parseInt(id)+1;
   const {status , err} =  storeBookStore(relativePath , {books , id});

   if(status === 201) 
     res.status(201).send(book);

    res.status(500).send({err});


})

// getting updated data in the body 
app.patch('/book' , (req , res)=>{

    const {books , id  } = getBookStore(relativePath);
    const {body:book} = req ;
    
    const oldBook = books.find((b)=>b.id === book.id); // oldbook has took the refrence of book in the books array 

    if(!oldBook){
        res.status(404).send("no such book found");
        return ;
    }

    // only those properties or keys or attributes are changes those are send to change 
    for(let key in book){

        if(oldBook.hasOwnProperty(key))
            oldBook[key] = book[key];
    }


    storeBookStore(relativePath , {books , id });

    res.status(200).send(oldBook);


})

app.put('/book' , (req , res)=>{

    const {books , id  } = getBookStore(relativePath);
    const {body:book} = req ;
    
    const oldBook = books.find((b)=>b.id === book.id); // oldbook has took the refrence of book in the books array 

    if(!oldBook){
        res.status(404).send("no such book found");
        return ;
    }

    // only those properties or keys or attributes are changes those are send to change  


    for(let key in oldBook){

        if(!book.hasOwnProperty(key)) {

            res.status(400).send("bad request , provide all the attributes");
            return ;
        }
    }

    for(let key in book){  

        if(oldBook.hasOwnProperty(key))
             oldBook[key] = book[key] ;
     }
    

    storeBookStore(relativePath , {books , id });

    res.status(200).send(oldBook);


})

// use query parameter
app.delete("/book" , (req , res)=>{

    const {books , id:maxId } = getBookStore(relativePath);
    const {id} = req.query ;

    if(!id) {
        res.status(400).send("the id is missing");
        return ;
    }

    const index = books.findIndex((book)=>book.id === parseInt(id) );

    if(!index){
        res.status(404).send("Book not found in bookStore");
        return ;
    }

    const deletedBook = books[index];

    books.splice(index,1) ; // index se 1 book delete kardo

    storeBookStore(relativePath , {books , id:maxId});

    res.status(200).send(deletedBook);

})



app.listen(PORT , hostname , ()=>{
    console.log(`server started at http://${hostname}:${PORT}`);
})
