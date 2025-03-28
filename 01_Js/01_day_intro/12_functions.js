
{
	// funtions in js 
	// functions are the values , holding the block of code and the code can be used anytime when the func is called 

	// ways to make function 


	// classical function ( old way)

	function factorial(n){
		let ans = 1 ;

		for( let  val = 1 ; val <= n ; val++){
			ans *=val ;
		}
		return ans ;

	}

	console.log(factorial(5)) ;

	// we can hold function in the variable
	const fibonacci = function(n){
		if(n == 0 || n == 1) return 1 ;
		return fibonacci(n-1 )+ fibonacci(n-2) ;
	}
	console.log(fibonacci(5)) ;

	// arrow function 

	const sum1 = (a , b)=>{
		return a + b ;
	}

	// we dont need {} ans return keyword brackets when there is only one statement  

	const sum2 = (a,b)=>  a+b ;  // value a+b is returned when the statement executes 
	
	const getAge = (age)=>age ;

	const getAge2 = age=>age+1 ;  // jab ek hi parameter ho to () ki bhi need nhi hoti 

	const print = ()=>console.log("hello world") ;  // with no parameters we need ()


	// multiple values ko ek hi variable mai lene ke liye rest operator ka use ...  ( nums is the array)

	// the variable nums technically is parameter
	const sum = (...nums)=>{
		let ans =0 ;
		for(let val of nums){
			ans+= val ;
		}
		return ans ;
	}


	// jo value pass ki hai technically these are arguments 
	console.log(sum(1,2,3,4,5)) ;



	let user = {
		name : "Neetesh" ,
		age : 21  ,
		gender : "ale"
	}

	// objects are passed as the refrence
	function printUser(user){
		user.age++ ;
		console.log(`userName : ${user.name} and ${(user.gender == "male") ? "he" : "she"} is ${user.age} old `) ;
	}

	printUser(user) ;
	console.log(user.age) ;

	// in this case the values are passed by the value
	function printUSer2({name , age , gender}){
		age++ ;

		console.log(`userName : ${name} and ${(gender == "male") ? "he" : "she"} is ${age} old `) ;

	}

	printUSer2(user) ;
	console.log(user) ;	
	

}

{

	// prototype


	function sum(a , b){
		return a+b ;
	}

	console.log(Object.getPrototypeOf(sum) == Function.prototype) ;
	console.log( Function.prototype.__proto__ ==  Object.prototype) ;


	const str = "Hello" ;

	console.log(Object.getPrototypeOf(str) == String.prototype) ;
	console.log(Object.getPrototypeOf( String.prototype) == Object.prototype) ;


	console.log(Object.getPrototypeOf(4) == Number.prototype) ;
	console.log(Object.getPrototypeOf( Number.prototype) == Object.prototype) ;

    // everything in js is object 

}