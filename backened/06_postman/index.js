 
 import express from "express";
 
 const app = express();
 const PORT = 5008;
 
 
 // parsing of the data 
 app.use(express.json());
 // this is middleware used to convert json into js object 
 
 // get request ke liye url endpoints completely match karne chahiye tabhi uspar request jayegi 
 app.get("/user" , (req , res)=>{
 
 
 
     res.send({
         name : "Neetesh Parihar"
 
     });
 
 
 })
 
 // app is listening for post reqeust at /user url endpoint  
 app.post("/user" , (req , res)=>{    
 
     const {body} = req ;
 
     console.log(typeof body.age) ;
 
     console.log(body) ; // this is showing undefined bcz 
     res.send({
         user : "saved"
     })
 
 
 })
 
 // app is listening for put requests at /user url endpoint
 app.put("/user" , (req , res)=>{
 
     const {body} = req ;
 
     console.log(typeof body) ;
      res.send({
         user : "updated"
     })
 
 })
 
 // app is listening for patch request at url endpoint /user/name
 app.patch("/user/name" ,(req , res)=>{
 
 
     const {body} = req ;
 
     console.log(body) ;
      res.send({
         user_name : "updated"
     })
 
 
 } )
 
 // app is listening for delete request at url endpoint /user/account 
 app.delete("/user/account" , (req , res)=>{
     
     console.log("deleted");
     res.send({
         acount_id : "deleted"
     })
 })
 
 // but middleware par initial jo route hai bo agar requested url endpoint ke starting mai present hai to middleware par request jaati hai
 
 app.use("/user/:name" , (req , res)=>{
 
     console.log("i am middleware");
     res.send({
         name : "Neetesh"
     });
 })
 
 app.listen(PORT , ()=>{
     console.log("server has started");
 })
 
 /* 
 
 default http method --> get  we can use same format for all the CRUD operations 
 
 sending post request  from frontend 
 
 const data = await fetch("http://www.example.com/data" , {
 
     method : 'POST' ,
     headers : {
         'Content-Type' : 'application/json'
     },
 
     body: JSON.stringify({name : "neetesh" , age : 21});
 
 })
 
 */