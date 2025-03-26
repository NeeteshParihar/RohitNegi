{
  // understanding the numbers

  const num1 = 20; // primitve

  const num2 = new Number(20); // objects
  const num3 = new Number(20);

  console.log(num2 + num3); // whenever we do maths it can operate in these

  console.log(num1 == num2); // true bcs of num2 typecasted into primitve
  console.log(num1 === num2); //  false type check is also there

  // == and === behave same for objects or non-primitves
  // object tabhi eqaul hote hai jab bo same memory ko hold karte hai with same content

  console.log(num2 == num3);
  console.log(num2 === num3);

  // yaha pe type casting hogi
  console.log(num1 >= num2);

}
{
	// Numbers methods 

	const num = 21.67 ;

	// toFixed argument --> [0 , 100]
	// decimal ke baad tak kitne digit 
	// roundoff the last digit  , with rules 
	// agar next digit h aur greater or equal 5 h then last digit mai 1 add ho jata h 


	console.log(num) ;
 	console.log(num.toFixed(0)) ;
	console.log(num.toFixed(1)) ;
	console.log(num.toFixed(2)) ;
	console.log(num.toFixed(3)) ;


	// toPrecision
	// arguments from [1 , 100]
	// total kiten digits chahiye from starting
	// agar  decimal ke pehle y digit h and muhje x digit chahiye for x < y then (y-x) digits 0 se replce ho jayenge with rounding off , and converted in exponent form 
	// 1234 ---> toPrecison(2) --> 1200 --> 1.2e+3 

	// console.log(num.toPrecision(0))  

	console.log('\n' , num) ;
	console.log(num.toPrecision(1)) ;
	console.log(num.toPrecision(2)) ;
	console.log(num.toPrecision(3)) ;
	console.log(num.toPrecision(4)) ;
	console.log(num.toPrecision(5)) ;
	console.log(num.toPrecision(100)) ;

	// console.log(num.toPrecision(101)) ; must be 100 or less 


	// toExponent 
	// convertes into scintafic notaton or exponent form

	console.log(num.toExponential()) ;
	console.log(num.toString()); // converts into string
  console.log(num.valueOf()); // return integer value
  console.log(typeof num.valueOf());

  // format : firstDigit.xxxxe+y 
  console.log(Number(1234).toExponential()) ; 



}
{
	// Math operations 

	// eulers value
	console.log(Math.E);
	console.log(Math.PI);
	console.log(Math.LN10); 

	console.log(Math.random()) ; // random number from [0 , 1) 

	const num = 4.5 ;

	console.log(Math.floor(num)) ; // returns just smaller integer 
	console.log(Math.ceil(num)) ; // returns just greater integer 

	// for integer it returns the same number 
	console.log(Math.floor(5)) ;
	console.log(Math.ceil(5)) ;


	function randomInTheRange(start , end){

		// range : [start , end) 
		// match wito 0 so subtract start 
		// range : [0 , end-start ) 
		// to make in the required range add start
		// range : [start , end) 

		const val = Math.random()*(end-start) + start ;
		return Math.floor(val) ;

		// if want to generate from [start , end] either pass end+1 in the function 
		// or modify the current function 

		// range : [start , end] 
		// subtract : [0 , end-start] 
		// in order to generate the end-start 
		// Math.random()*(end-start+1) ;
		// result : [0 , end-start+1) 
		// same as : [0 , end-start]

	}

	console.log(randomInTheRange(4,19)) ;
	
	// the algorithm uses some kind of values called initial seed 
	// which helps algorithm to generate the number 

}
