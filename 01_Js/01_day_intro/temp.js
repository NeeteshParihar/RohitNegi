
{
	// understanding the date 
	// importance : it can be used for detection that which student submited the quiz first 

	const dateObj = new Date() ;

	console.log(dateObj) ;

	// output is like  this : 2025-03-26T04:44:44.117Z 
	// value before t is the year-month-date 
	// value after t is the time and z refers to zulu time format means utc(which is universal time format) ;
	// time is 04:44:44.117   --> hours:minutes:seconds:miliseconds (24 hrs format)
	// there are 24 time zones 
	// india follow utc+5:30 so add 5:30 to the utc value to get the indian standard time 
	// 04:44:44.117 + 05:30:00.00  ---> (add from left to right)
	// 9:74:44.117 --> take carry as minutes are 74 means add 1 to hrs and 74 --> 14 minuts 

	// 10:14:44.117   (time in 24 hrs format )  
 	console.log(dateObj.toTimeString()) ; // actual time of the day  
	console.log(dateObj.toString()) ;   // print date and time both 
	console.log(dateObj.toDateString()) ;

	// the date and time is fetched from the system // try changing the system time 

	const date2 = new Date(1000) ; // 1 Jan 1970 time 12:00:00.00 se 1000 miliseconds aage ka time 
	console.log(date2) ;		// what is the role of the  1 Jan 1970 time 12:00:00.00 
	console.log(date2.getMonth()) ; // for january --> 0 

	



}

{

	// date methods 

	const dateObj = new Date() ;

	console.log(dateObj.getDate()) ; // todays date ex : 26 
	console.log(dateObj.getDay()) ; // todays day ex : 0 ( monday) ;

	console.log("full year") ;
	console.log(dateObj.getFullYear()) ;

	console.log(" current mili seconds")
	console.log(dateObj.getMilliseconds()) ;

	console.log("minutes")
	console.log(dateObj.getMinutes()) ;

	// time measured in milliseconds are more accurate 

	const inMilliSeonds = dateObj.getTime() ;  // 1 jan 1970 T 12:00:00.00 se time ko milliseonds mai calculate karta hai 
	console.log(new Date(inMilliSeonds)) ;  
	
	// another way to get time in milliseconds 

	const t = Date.now() ;
	console.log(t) ;

	// extra ways to get date 

	console.log("customDates") ;
	const customDate = new Date("2003-12-22") ; // jo time pass ki hai bahi return hoti h
	console.log(customDate) ;

	// we can pass time also hh:mm:ss.sss
	const customDate2 = new Date(2003 , 11 , 22) ; // here months are 0 based indexed so 12th --> 11th 
	console.log(customDate2) ;

	console.log(new Date(2003 , 11 , 22 , 4 , 35 , 22 , 44)) ; // we have to pass atlest two values otherwise 
	// if one value passed it calculte time from 1970  and adds the first value in it
	// it no value passed it calcuates current time 


	//we can modify the date object 

	const d = new Date() ;
	d.setFullYear(2003) ;
	d.setMonth(11) ;
	d.setDate(22) ;
	console.log("after modification") ;
	console.log(d) ;

	// jo part modify nahi kiya hai bo normal rahega 

	// jo country ya region jis format ko follow karti hai us ke according 
	console.log(d.toLocaleDateString()) ;
	console.log(d.toLocaleString()) ;
	console.log(d.toLocaleString()) ; 

}

{
	// date and time calcuation 

	const date1 = new Date(0) ; 
	const date2 = new Date() ;

	console.log(date2 - date1) ;  // result in milliseconds  ( for understanding date is treated in milliseonds and then operation happens ) 

	console.log(new Date(date2 - date1)) ;  // current time 

	console.log(date2 > date1) ;

	console.log( ) ; 

	function countDown(currentDate, futureDate) {
		const t = futureDate - currentDate; // in milliseconds
	
		const days = Math.floor(t / (24 * 60 * 60 * 1000));
		const hrs = Math.floor((t % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
		const mints = Math.floor((t % (60 * 60 * 1000)) / (60 * 1000));
		const sec = Math.floor((t % (60 * 1000)) / 1000);
		const miliSec = Math.floor((t ) % 1000) ;
	
		console.log(`${days} days : ${hrs} hours : ${mints} minutes : ${sec} seconds : ${miliSec} mili_seconds`);
	}
	
	countDown(new Date(), new Date(2028, 7, 23));

	function countDown2(currentDate, futureDate) {
		const t = futureDate - currentDate; // in milliseconds
	
		const days = Math.floor(t / (24 * 60 * 60 * 1000));
		const hrs = Math.floor((t / (60*60*1000)) % 24);
		const mints = Math.floor((t / (60*1000)) % 60);
		const sec = Math.floor((t/1000) % 60);
		const miliSec = Math.floor((t ) % 1000) ;

	
		console.log(`${days} days : ${hrs} hours : ${mints} minutes : ${sec} seconds : ${miliSec} mili_seconds`);

	}

	countDown2(new Date(), new Date(2028, 7, 23));

	





}

