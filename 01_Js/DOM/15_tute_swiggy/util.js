function createNewElement(tagName){
    return document.createElement(tagName) ;
}

function getTarget(event){
    return event.target ;
}



async function fetchData(url){

    try{
        const res = await fetch(url) ;
        const data = await res.json() ;
        return data ;
    }catch(error){

        console.log(`error fetching : ${url}` ) ;
        return [] ;

    }

}

export {createNewElement , getTarget , fetchData} ;
