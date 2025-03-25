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