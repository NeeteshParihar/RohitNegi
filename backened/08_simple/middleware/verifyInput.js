
export function isInputValid( body , mySchema ){

    // mySchema is a object have properties and it checks if those are also present or not in request body 

    console.log(body);

    for(let prop in mySchema){
        if(!body[prop]  || typeof body[prop] !==   typeof  mySchema[prop]) return false ;        
    }

    return true ;

}