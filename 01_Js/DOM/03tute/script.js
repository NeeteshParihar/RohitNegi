

const days = document.getElementById("days") ;
const hours = document.getElementById("hours") ;
const minutes = document.getElementById("minutes") ;
const seconds = document.getElementById("seconds") ;



setInterval(display , 1000) ;

function display(){
	
const olympics = new Date(2026 ,1 ,6 ) ;
const today = new Date() ;

const milli = olympics - today ;


const sec = Math.floor(milli/(1000))%60 ;
const min = Math.floor(milli/(1000*60)) % 60 ;
const hrs = Math.floor(milli/(1000*60*60)) % 24 ;
const d = Math.floor(milli/(1000*60*60*24)) ;


days.innerText = d ;
hours.innerText = hrs ;
minutes.innerText = min ;
seconds.innerText = sec ;


	
}
