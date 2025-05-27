

async function getData(url) {

    try {

        const res = await fetch(url,{
            method: 'GET',
        })

        const data = await res.json();
        console.log(data);

    } catch (err) {


    }

}

 async function saveData(url){

    try{

        const res = await fetch(url , {
            mathod : 'POST' ,   // http method 
            headers : {
                'Content-Type' : 'application/json',  // meta deta 
            },

            body : JSON.stringify({name : "Neetesh" , age : 21}) // acutal data to be saved 
        })

        const data =  await res.json() ;

        console.log(data);


    }catch(err){

        console.log(err) ;

    }

}


 async function updateUser(url){

    try{

        const res = await fetch(url , {
            mathod : 'PUT' ,   // http method 
            headers : {
                'Content-Type' : 'application/json',  // meta deta 
            },

            body : JSON.stringify({name : "Neetesh" , age : 21}) // acutal data to be saved 
        })

        const data =  await res.json() ;

        console.log(data);


    }catch(err){

        console.log(err) ;

    }

}


 async function updateUserName(url){

    try{

        const res = await fetch(url , {
            mathod : 'PATCH' ,   // http method 
            headers : {
                'Content-Type' : 'application/json',  // meta deta 
            },

            body : JSON.stringify({name : "Neetesh" }) // acutal data to be saved 
        })

        const data =  await res.json() ;

        console.log(data);


    }catch(err){

        console.log(err) ;

    }

}

 async function deleteUserAccount(url){

    try{

        const res = await fetch(url , {
            mathod : 'DELETE' ,   // http method 
            headers : {
                'Content-Type' : 'application/json',  // meta deta 
            },

            body : JSON.stringify({name : "Neetesh" , age : 21}) // acutal data to be saved 
        })

        const data =  await res.json() ;

        console.log(data);


    }catch(err){

        console.log(err) ;

    }

}

const url = `http://localhost:5008/user`;

saveData(url);

