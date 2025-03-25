{
  // comparision operators
  const num1 = 5,
    num2 = 10;

  console.log(num1 == num2);
  console.log(num1 < num2);
  console.log(num1 <= num2);
  console.log(num1 > num2);
  console.log(num1 >= num2);

  console.log("\n\n\n");
}
{
  // implicit typeconversion : js converts by default from one datatype to other

  // when comparing with  number  the other datatype is converted into a number , if it cannot be converted then it converts to NaN

  // comparision with NaN results in false

  console.log(5 == "5");
  console.log(5 == "Hello");
  console.log(1 == true);
  console.log(0 == false);
  console.log(0 == "");

  console.log(NaN <= 0);
  console.log(NaN >= 0);

  // === , 1.checks datatype 2. value

  console.log(5 === "5"); // kya dono ka type and value same h 
  // console.log(5 >== "5")  ; nohting like this

  // comparing strings

  console.log("a" > "A");
  console.log("aa" > "a");
  console.log("aa" == "a");
  // corresponding characters are compared
}
{
  // comparision of null
  // rule1  , null == undefined --> true
  // rule2  , null === undefined --> false

  // in equality null is only equal to undefined and itself , there in no typeconversion
  // in greater or smaller cases there is always type conversion

  console.log(null == undefined);
  console.log(undefined === null);
  console.log(null == 0, null == "");

  // implicit typeconversion
  console.log(null >= 0);
  console.log(null >= false);
  console.log(null >= "");

  // undefined comparisions
  console.log(undefined == 0);

  // implicit typeconversion
  // Number(undefined) --> NaN  , comparison with NaN is false

  console.log(undefined >= "")   ;
  console.log(undefined <= false) ; 

  // unique cases
  console.log(undefined == undefined);
  console.log(undefined >= undefined);
  console.log(undefined <= undefined);
  console.log(NaN == NaN);
}
{
  // comparing primitives with non-primitves

  // numbers with obj , obj converted to "[object object]" then this converted to  NaN

  console.log(5 == {});

  // number and array
  console.log(5 == [5]);
  console.log(5 < [6]);
  console.log(5 === [5]); // always false
  console.log(5 == [2, 3]); // array to  NaN
}

// ctrl + shift + I  --> indent
{
  // logical operators
  // || --> if first is true it returns first value  and will no check second valjue
  // if first false it return second value

  console.log(5 || "");
  console.log("" || undefined);

  // && -->if first is false it returns the first value and will not check second value
  // otherwise it returns second value

  console.log(undefined && 5);
  console.log(5 && undefined);
}

// use pen and copy  
{

	//bitwise operators 
	// checks corresponding bits 

	// the result of comparison is also a bit 
	// bitwise & (and) 
	// 1&1 == 1 other 0&1 , 1&0 , 0&0 --> 0    

	console.log(4&5)  ;  

	// 4 in binary  --> 100 
	// 5 in binary --> 101 

	// compares the corresponding bits from left , if not of same size ( it always has 64 bits so rest are padded with 0) 

	// 100 & 101 --> 100
	// 100 in decimal 4
	
	// bitwise | (or) 
	// 0|0 --> 0 rest are 1 
	// atlest one of  should be 1 to became 1 

	console.log(4 & 4) ;
	console.log(4 & 5) ;

	// bitwise xor ^
	// different bit --> 1 , same bit --> 0
    console.log(4^5) ;


	// left shift and right shift 

	// 4 ki bits ko right ki taraf shift kardo  1 baar 
	console.log(4<<1) ; // left shift 
	// 100 --> 1000  // doulbes the number 
	console.log(4 >> 1) ;
	// 100 --> 10 , half it 






}
{

	// bitwise and negative numbers 
    // bitwise number operats on 32bit singed integer so , the negative number is converted to two's compliments

	console.log(-5 & 5) ; 

	// -5  in binary 
	// 5 -->  101 
	// one complimnet , 101 --> 110
	// two's compliment ,  110 --> 001  

	// 001 & 101 --> 001 --> 1  

	// practice it  

	// converting back to number when it negative
	// suppose result --> 101 --> note the sign , - 
	// subtract 1 , 101 - 1 --> 100
	// take two's compliment ( invert bits ) ;
	// 100 --> 011  --> 3 and with sign  its -3 

	console.log(~2) ; // -3 use above logic 

	// bitwise not ~  converts 0 to 1 and 1 to 0 


  // in case of floating numbers , the numbers are converted to integer then bitwise operators are operats on them 

	console.log(5.4 & 4.4) ;
	
    
}
