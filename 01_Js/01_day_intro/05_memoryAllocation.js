

{
	// memory management in js 
	// primitives : immutable i.e (value can't be changed )_their value can't be changed at current memory refrence , but new memory can be created for the new value 
	// non-primitves : can be  modified 


	let num1 = 5 ;
	// num1 value is copied and assigned to num2 
	let num2 = num1 ;
	
	console.log(num1 ) ;
	console.log(num2) ;

	// no chnage in num1 as both are refrencing the different memory locations 
	num2 = 10 ;
	console.log(num1) ;
	console.log(num2) ; 


	const obj1 = {
		name : "Neetesh" ,
		age : 21 
	}

	// when this statment executes , obj2 ko obj1 ki memory ka refrence miljata hai and yaha pe koi alag se memory nahi banti 
	// so obj2 is not the copy of obj1 but it points or have refrence of the same memory location that obj1 have 
	const obj2 = obj1 ;

	console.log(obj1) ;
	console.log(obj2) ;

	// modification also reflects in obj1
	obj2.name = "Nitesh" ;
	console.log(obj1) ;
	console.log(obj2) ;

	obj1.address = function(){
		console.log("Indore") ;		
	}

	console.log(obj1) ;
	console.log(obj2) ;



}

{

	// understanding the const data types 

	const num1 = 5 ;

	try{
		num1 = 10 ;
	}catch(error){
		console.log("Error changing the values") ;
	}


	const obj1 = {
		name : "Neetesh" ,
		id : 10 
	}

	obj1.id = 11 ;
	console.log(obj1) ;

	const obj2 = {
		name : "hitesh" ,
		id : 11 
	}


	try{
		obj1 =  obj2;
	}catch(error){
		console.log("cannot change the refrence of the object ") ;
	}


}