


const body = document.body ;

const param = window.location.search ;
const obj = new URLSearchParams(param) ;

const parameter = obj.get("category") ;



if(parameter){

    body.innerHTML = parameter ;

}else{

    body.innerHTML = "food restuarants" ;
}
 


[
   "https://www.freepik.com/search?format=search&last_filter=query&last_value=Food+dosa+&query=Food+dosa+" ,

   "https://www.freepik.com/search?format=search&last_filter=query&last_value=burger&query=burger" ,

   "https://www.freepik.com/search?format=search&last_filter=query&last_value=pasta+&query=pasta+",

   "https://www.freepik.com/search?format=search&last_filter=query&last_value=noodles&query=noodles",

   "https://www.freepik.com/search?format=search&last_filter=query&last_value=starbukc&query=starbukc" ,

   

]



















