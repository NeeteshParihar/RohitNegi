

function auth( res , req , next){

    let hasAcess = true ;  // later we can implement this part 

    if(hasAcess) {
        next();
    }else{
        res.status(401).send("UnAuthorised");        
    }

}

export {auth} ;