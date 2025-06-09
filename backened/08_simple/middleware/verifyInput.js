
export function isInputValid( body , mySchema ){

    // mySchema is a object have properties and it checks if those are also present or not in request body 

    // console.log(body);

    if(!body) return false ;

    console.log(typeof body.id , typeof mySchema.id);
   
    console.log(mySchema);

    // body[prop] agar value , "" , 0 , hoti then return false hojata 
    for(let prop in mySchema){
        if( !body.hasOwnProperty(prop)   || typeof body[prop] !==   typeof  mySchema[prop]) return false ;        
    }

   
    return true ;

}