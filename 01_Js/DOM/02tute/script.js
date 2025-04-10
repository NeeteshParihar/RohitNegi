

const timerContainer = document.getElementById("timer") ;

setInterval(()=>{

	const currentDate = new Date() ;
	const todaysStart = new Date(currentDate.getFullYear() , currentDate.getMonth() , currentDate.getDate() , 0 , 0 , 0 , 0) ;
 	const milliSeconds = currentDate - todaysStart ;
	
	const seconds = Math.floor( milliSeconds/1000) ;
	
	display(seconds) ;
},1000)

function display(seconds){

	let m = Math.floor(seconds/60)%60 ;
	let h = Math.floor(seconds/3600)%24 ;
	let s = seconds%60 ;

	const meredian = (h >= 12) ? "PM" : "AM" ;

	if(h%12 == 0) h = 12 ;
	else h = h%12 ;

	h = String(h).padStart(2, '0') ;
	m = String(m).padStart(2, '0') ;
	s = String(s).padStart(2, '0') ;

	const time = `${h}:${m}:${s} ${meredian}` ;

	timerContainer.innerText =time ;

}