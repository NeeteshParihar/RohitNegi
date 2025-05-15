
import { createNewElement , getTarget} from "./util.js";


const instamatContainer = document.querySelector("#instamatItem") ;
const instmatScroller = document.querySelector(".instmatScroller") ;


const dishUrl = "./Resources/instamat_data.json" ;


instmatScroller.addEventListener("click" , (event)=>{

    const scrollAmount = 200 ;

    const target = getTarget(event) ;

    if(target.tagName != "BUTTON") return ;


    if(target.classList.contains("left-instamat")){
        instamatContainer.scrollLeft -=scrollAmount ;

    }else{
        instamatContainer.scrollLeft +=scrollAmount ;
    }

})


instamatContainer.addEventListener("click" , (event)=>{

    let target = getTarget(event) ;


    const button = target.closest("button") ;

    if( !button &&  button.tagName != "BUTTON") {
        return ;
    }
    
    const category = button.getAttribute("category") ;

    console.log(category);

    const url = `/instamat/instamat.html?category=${category}` ;

    navigate(url) ;


}  )

function navigate(url){
    window.location.href = url ;
}


async function fetchDishes(url){

    try{

        const res = await fetch(url) ;
        const data = await res.json() ;
        return data ;
        

    }catch(error){
        console.log("error fethcing data") ;
        return [] ;
    }

}

async function displayDishes(dishUrl){
    const instamatItem = await fetchDishes(dishUrl) ;

   instamatItem.forEach(({name , img}) => {

      const button = createNewElement("button") ;
      const image = createNewElement("img") ;
      image.src = img ;
      image.classList.add("instamatItem") ;
      const para = createNewElement("p") ;
      para.innerHTML = name ;


      button.append(image , para) ;
      button.setAttribute('category', name);  

      instamatContainer.append(button) ;

    
   });


    
}


displayDishes(dishUrl) ;






