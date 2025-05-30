
import {PORT , app} from "./server.js";
import { adminPath , userPath } from "./env.js";
import { readFile , writeToFile , startServer} from "./util.js";

// const path = './admins.json';


// <-----------returns array ----------->
function filterAdmins(admins , instance , constrants){

    let ans = admins ;

    for( let key in constrants){

        if(instance[key] || constrants[key]){
            ans = admins.filter((admin)=>{
              return  String(admin[key]) === String(constrants[key]);
            })

        }

    }

    return ans ;


}

function filter(arr , fn , constrants){

    let ans = [];

    arr.forEach(data=>{
       if(fn(data , constrants )) ans.push(data);
    })

    return ans ;

}

function isPresent(fn , ...vals){
    for(let val of vals){
        if(!fn(val)){
            console.log(val);
            return false ;
        }
    }


    return true ;
}

function JSONString(data){
    return JSON.stringify(data);
}

function getHttpMetho(req ){
    return req.method ;
}

app.get('/admin' , (req , res)=>{

    const constrants = req.query ;

    // console.log(req.query);

    const admins = readFile(adminPath);

    if(admins.length == 0){
        res.send(404).send("Admin does not exist");
    } 

    const instance = admins[0] ;

    let ans = filterAdmins(admins , instance , constrants);

    res.status(200).send(ans);
})


// specify adminId clarly 
// /admin/menu/item?adminId=1&id=2&name=badapau
app.get('/admin/menu/item' , (req , res)=>{

    const {adminId , ...itemConstrants} = req.query ;

    if(!adminId || !itemConstrants){
        end(res , "bad get request" , 500);
        return ;
    }

    const admins = readFile(adminPath);
    const admin = filterAdmins(admins , {id:true}, {id:adminId})[0];

    if(!admin){
        end(res , "admin not found" , 404);
        return ;
    }

    let menu = admin.menu ;

    if(menu.length === 0) {
        end(res , menu);
        return ;
    }

    const instance = menu[0] ;

    for(let key in itemConstrants){
        if(!instance.hasOwnProperty(key) || !itemConstrants[key]) continue ;

        menu = menu.filter(item=>String(item[key]).toLowerCase() === String(itemConstrants[key]).toLowerCase());

    }

    end(res  , menu ) ;

})

app.get("/item/:name" , (req , res )=>{

    const {name} = req.params ;

    if(!name){
        end(res , "not found");
        return ;
    }

    let ans = [] ;
    let id = 0 ;


    const admins = readFile(adminPath);

    admins.forEach(({id:adminId , menu , name:adminName })=>{

        menu.forEach((item)=>{

            if(item.name.toLocaleLowerCase().trim() 
                 === name.toLocaleLowerCase().trim()){

                ans.push({
                   ...item ,
                   id : id++ ,
                   adminId ,
                   adminName 

                })

            }

        })


    })

    end(res , ans );


})


// note /admin?id=1/menu will hit /admin and id=1/menu is taken as query parameter 
// so your reqeust should be /admin/menu?id=1

app.get("/admin/menu" , (req , res)=>{
    
    const {id} = req.query ;

    if(!id){
        res.status(500).send("specify");
    }

    const admins = readFile(adminPath);


    if(admins.length === 0) {
        res.status(404).send("not found");
        return ;
    }

    const ans = filterAdmins(admins , admins[0] , {id}
 );

    if(ans.length === 0) {
        res.status(404).send("Not Found");
    }{

        const menu = ans[0].menu ;
        res.send(menu);
    }

}) 


app.post('/admin' , (req , res)=>{
    
    const {body:newAdmin} = req ;


    const admins = readFile(adminPath);

    let id = admins.length +1;

    admins.forEach(admin=>{
        if(parseInt(admin.id) >= parseInt(id)) id = admin.id+1;
    })

    const val = {
        id , ...newAdmin
    }
        
    admins.push(val);

    res.send(val);

    writeToFile(adminPath ,JSONString(admins) );
    
})


app.delete("/admin" , (req , res)=>{

    const {id} = req.body ;

    if(!id){
        res.status(500).send("can't delete");
        return ;
    }

    const admins = readFile(adminPath);

   
    const index = admins.findIndex((admin=>{
       return String(admin.id) === String(id);
    }));

    if(index === -1) {
        res.status(404).send("Not found");
    }

    const deletedAdmin = admins[index];
    admins[index] = admins[admins.length-1];
    admins.pop() ;

    console.log(admins);

    res.send(deletedAdmin);
    writeToFile(adminPath , JSONString(admins));


})

function end(res  , message , code = 200){
    return res.status(code).send(message);
}

// /admin/name?id=
app.patch('/admin/name' , (req , res)=>{

   const {body:target} = req ;

   const {id , name } = target;


    if(!id) {
        end(res , "bad request" , 500);
        return ;
    }

    const admins = readFile(adminPath);
    const admin = filterAdmins(admins , {id:true}, {id})[0];


    if(!admin){
        end(res , "not found" , 404);
        return ;
    }

    admin.name = name ;
    end(res, admin);

    writeToFile(adminPath , JSONString(admins));


})

app.put('/admin/menu' , (req , res)=>{

    const {body:{id , menu}} = req ;

    if(!id || !menu){
        end(res, "bad request" , 500);
        return ;
    }


    const admins = readFile(adminPath);
    const admin = filterAdmins(admins , {id:true}, {id})[0];


    if(!admin){
        end(res , "not found" , 404);
        return ;
    }

    admin.menu = menu ;
    end(res, admin);

    writeToFile(adminPath , JSONString(admins));





})


app.patch("/admin/menu" , (req , res)=>{

    const {body:{adminId , itemId , item}} = req ;

    if(!adminId || !itemId || !item) {
        end(res , "bad rquest"  , 500);
        return ;
    }


    const admins = readFile(adminPath);

    const admin = filterAdmins(admins ,{id : true} , {id : adminId})[0] ;

    const index = admin.menu.findIndex(item=>String(item.id) === String(itemId));

    if(index === -1){
        end(res , "item not found" , 404);
        return ;
    }

    admin.menu[index] = {
        id : itemId , 
        ...admin.menu[index] ,
        ...item
    }

    end(res , admin);

    writeToFile(adminPath , JSONString(admins));


})


app.delete("/admin/menu" , (req , res)=>{

    const {body:{adminId , itemId}} = req ;

    if(!adminId || !itemId){
        end(res , "bad request" , 500);
        return ;
    }

    const admins = readFile(adminPath);
    const admin = filterAdmins(admins , {id:true} , {id : adminId})[0];

    if(!admin){
        end(res , "not found" , 404);
        return ;
    }

    const index = admin.menu.findIndex((item)=>String(item.id) === String(itemId)) ;

    if(index === -1){
        end(res , "item not found in admins menu" , 404);
        return ;
    }



    const deletedItem = admin.menu[index];

    admin.menu[index] = admin.menu[admin.menu.length-1];
    admin.menu.pop();





    end(res ,{ adminId, item : deletedItem});



    writeToFile(adminPath , JSONString(admins));

})


app.post("/admin/menu"  , (req , res)=>{


    const {body:{adminId, item}} = req ;

    if(!adminId ){
        end(res , "bad request" , 500);
        return ;
    }

    const admins = readFile(adminPath);
    const admin = filterAdmins(admins , {id:true} , {id : adminId})[0];

    if(!admin){
        end(res , "not found" , 404);
        return ;
    }

   const itemId = admin.menu.length+1 ;

   admin.menu.forEach((item)=>{
    if(item.id >= itemId) itemId = item.id+1;
   })

   const newItem = { 
    id:itemId , ...item 
   }

   admin.menu.push(newItem);

   end(res , { adminId , item : newItem})

//    console.log(admin.menu);

   writeToFile(adminPath , JSONString(admins) );

})


app.use("/user" , (req  , res , next)=>{

    if(getHttpMetho(req) === "DELETE"  ){

        const present = isPresent((body)=>{
            if(!body.id || typeof body.id !== "Number"  )return false ;
            else return true ;
        }, req.body);



        if(!present) {
            end(res , "bad request" , 500);
            return ;
        }else{
            next();
        }

       
    }else if( getHttpMetho(req) === "POST"){

        const present = isPresent((body)=>{

            if(!body.name || !body.cart || !Array.isArray(body.cart)){
                return false ;
            }else{
                return true ;
            }

        } , req.body);

        if(!present){
            end(res , 500 , "send all the requeried attributes");
        }else{

        } 

    }

    res.send("hello");

})

app.get("/user" , (req , res)=>{

})


startServer(PORT , app);




