{
	// different ways to create strings 

	let str1 = "Hello" ;
	let str2 = 'Hello' ;
	let str3 = `Hello` ;

	console.log(str1 , str2 , str3 ) ;

	// escape chacter --> \ 

	console.log("hello i am neetesh \\n i am from gwalior") ;

	let score = 50 ;
	// template string

	const result = `Your score is ${score}` ;
	console.log(result)  ;

}


{

	// string methods 

	const str1 = "hello world" ;

	console.log(str1.length) ;
	console.log(str1[0]) ;
	console.log(str1.charAt(0)) ;

	console.log(str1.slice(0, 3)) ;
	console.log(str1.substring(0, 3)) ;
	// sice can accept negative index ( -1 for the n-1 , -2 for n-2 and so on ) negaitve index = index - n

	console.log(str1.slice( 0 - str1.length , 3 - str1.length) ) ;
	console.log(str1.substring( 0 - str1.length , 3 - str1.length) ) ;  // does not give expected results 

	const str2 = "hello world" ;

	console.log(str2.replace("world" , "duniya")) ;  // returns a new string
	console.log(str2) ;

	console.log(str2.split(" ")) ; // returns the array 


	const str3 = "  hello world  " ;

	console.log(str3) ;
	console.log(str3.trim()) ;	   // removes spaces from start and end until a character found 
	console.log(str3.trimEnd()) ;
	console.log(str3.trimStart()) ;

	const str4 = "  \n hello world " ;
	console.log(str4) ;
	console.log(str4.trim()) ; // removes newline also 



}

{

	// creating dynamic string 

	let name = new String("Neetesh") ;
	console.log(name) ;
	console.log(typeof name) ;
	const surname = "parihar" ;
	console.log(typeof  surname) ;

	name = name + new String(" parihar") ;
	console.log(name) ;
	console.log(name[0]) ;

	console.log(typeof name ) ;


	

}