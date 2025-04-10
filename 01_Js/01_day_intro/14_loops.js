
// "use strict" 

{

	// understanding the loops 

	let user = {

		name : "Neetesh" ,
		age : 21 ,
		address : "iet davv"
	}


	
	// cannot iterate values directly 
	// for(let val of user){
	// 	console.log(val) ;
	// }

	// for in loop iterate over the keys  and ye prototypes ki bhi properties ko access kar leta hai 

	for( let key in user){
		console.log(key) ;
		console.log(user[key]) ;
	}

	// second way to iterate 


	// user ki keys ko dedo 
	const keys = Object.keys(user) ;


	for(let key of keys){
		console.log(user[key]) ;
	}

	// difference btw both the ways 

	// for in or Object.keys

	const user2 = {

		name : "Neetesh" ,
		age : 21 ,
		address : "iet davv" ,

		greet : function(){
			console.log(`Hello ${this.name}`) ;
		}

	}

	// user2 ojbect is the prototype of the user3 
	const user3 = Object.create(user2) ;

	user3.balance = "4444" ;
	user3.id = "id403" ;

	for(let key in user2){
		console.log(key) ;
	}

	const user2Keys = Object.keys(user2) ;
	console.log(user2Keys) ;


	// accessing the user3



	// iss tarike se ye apne protoype ki bhi keys ko access karta hai 
	for(let key in user3){
		console.log(key) ;
	}

	const user3Keys = Object.keys(user3) ;  // is methods se sirf iski khudki created property hi milti hai jo enumerable ho
	console.log(user3Keys) ;

	user3.print = function(){
		console.log("hello world") ;
	}


	const user4 = Object.create(user3) ; 

	user4.school = "city child high school" ;

	console.log("Printing keys of the user4 that is based on user3 and user3 on user2")

	for(let key in user4 ){
		console.log(key) ;
	}

	// for in loop sabhi inherited properties ko iterate karwa deta hai custom objects mai 
	// we cannot access Ojbect.prototype properties baaki saari kar skte hai inclding functions 


	const temp = Object.prototype ;

	console.log(temp) ;
	// it not access the keys
	console.log("trying to print root ojbect properties keys'")
	for(let key in  temp){
		console.log(key) ;
	}
	console.log("does it prints") ;

	const TOSTRING = temp.toString ;


	// we can change the key value of the root object 
	Object.prototype.toString = "neetesh" ;
	console.log(Object.prototype.toString )

	temp.toString = TOSTRING ;

	console.log(Object.prototype.toString) ;



}


{


	// we canot access the root object properties bcz there are some properties accociated with the key 
	// these are , value , writable , enumerable , configurable 

	const ME = {

		name : "i am neetesh parihar" ,
		age : 21 ,

	}


	// mujhe ME object me name ke properties bata do 
	console.log(Object.getOwnPropertyDescriptor(ME , "name" )) ;

	console.log(ME.name.enumerable)

	ME.name.enumerable = false ; // does not changes in this way 
	console.log(Object.getOwnPropertyDescriptor(ME , "name" ))

	// no change 

	// writable means that weather it can be changed or not for true it can be changed (key ki value)
	// configurable means kya mai writable and enumerable properties ko change kar skta hoo ki nahi 


	const obj1 = {} ;

	// obj1 mai "name" add kardo with custom properties 
	Object.defineProperty(obj1 , "name" , {
		value : "Neetesh" ,
		writable : true ,
		enumerable : true ,
		configurable : true ,
	})

	console.log(obj1 ) ;

	obj1.name = "arun" ;
	console.log(obj1) ;


	Object.defineProperty(obj1 , "age" , {
		value : "21" ,
		writable : false ,
		enumerable : true ,
		configurable : true ,
	})

	console.log(obj1) ;

	// age ka writable false hai iliye ise change hi nahi kar skte 
	obj1.age = 23 ;
	console.log(obj1) ;

	Object.defineProperty(obj1 , "password" , {
		value : "123344" ,
		writable : true ,
		enumerable : false ,
		configurable : true ,
	})

	console.log(obj1.password) ;
	console.log(obj1) ;

	// hum un properties ko iterate nahi kar skte jinme enumerable false ho 
	for( let key in obj1){
		console.log(key) ;
	}


	// jab configurable false ho to hum writable to true se false and vice-versa nahi kar skte 

	// change the associated properties
	Object.defineProperty(obj1 , "password" , {
		value : "123344" ,
		writable : true ,
		enumerable : true ,
		configurable : true ,
	})

	
	console.log(obj1) ;

	Object.defineProperty(obj1 , "bank" , {
		value : "CBI" ,
		writable : true ,
		enumerable : true ,
		configurable : false ,
	})

	console.log(obj1) ;
	obj1.bank = "SBI" ;
	console.log(obj1) ;


	



	





}

{

	const user = {} ;

	Object.defineProperty( user , "name" , {
		value  : "Neetesh" , 
		writable : true ,
		enumerable : true ,
		configurable :false 
	})

	console.log(Object.keys(user)) ;
	user.name = "arun" ;
	console.log(user.name) ; // can't change 

	try{
		Object.defineProperty( user , "name" , {
			value  : "Neetesh" , 
			writable : false ,
			enumerable : true ,
			configurable :true 
		})
	
	
		console.log(user) ;
	}catch(error){

		console.log("agar first time configurable false kar diya jata hai to fir hum property ko dubara define nahi kar sakte")
	}



	const accountHolder = {
		name : "Neetesh" , 
		age : 21 ,
		accountNumber : 30001 
	}


	// bcz the accountNumber does not change : mkae it writable false 
	Object.defineProperty(accountHolder , "accountNumber" , {
		writable : false ,
	})

	accountHolder.accountNumber = 1424435 ; // does not change and no error 
	console.log(accountHolder.accountNumber) ;



	// important points 

	// when writable == false 
	// mode : non-strict : operation silently fails
	// mode : strict : throws type error
	




}

{

	// when configurable == true , we can change  writable and can delete property 
	// when condfigurable == false , we cant delete  and modify writable and enumerable 


	const user = {} ;

	Object.defineProperty(user , "name" , {
		value : "neetesh" ,
		writable : true ,   // nahi   mention karenge to false considered
		enumerable : true  ,
		configurable : false 
	})

	delete user.name ;

	console.log(user.name) ;

	user.name = "arun" ;

	console.log(user.name) ;

	Object.defineProperty(user , "name" , {
		writable : false ,
	})

	user.name = "Neetesh" ;
	console.log(user.name) ;



	// Object.defineProperty(user , "name" , {
	// 	writable : true ,
	// })


	// user.name = "Neetesh" ;
	// console.log(user.name) ;

	// note : jab enumerable == false ho and writable true then hum writable to modify kar skte hai , but agar writable false ho to usko modiify nahi kar skte 


	Object.defineProperty(user , "age" , {
		value :21 ,
		writable : true ,
		enumerable : true ,
		configurable : false 
	})




	// hum enumerable ko false ya true nahi kar skte once it is configurable is false 


	const temp = Object.prototype ;

	console.log(Object.getOwnPropertyDescriptor(Object.prototype , "toString")) ;


	Object.defineProperty(temp , "toString" , {
		enumerable : true 
	})

	console.log(temp) ;

	const user10 = {}  ;

	// kyoki maine enumerable == true kardiya hai is object ke prototype mai so toString enumerable hai in objects mai bhi
	for(let key in user10){
		console.log(user10[key]) ;
	}


	// before enumerable  was false
	console.log(Object.getOwnPropertyDescriptor(Object.prototype , "toString")) ;





}

{

	// we do not take for in with arrays 
	// array is an object so we can add any type off properties to it 


	const arr = [0,1,2,3,4,5,] ;

	console.log(arr) ;



	for(let key in arr){
		console.log(key , arr[key]) ;
	}

	arr.name = "neetesh" ;


	arr[15]= "kngb" ;

	console.log(arr) ;

	for(let key in arr){
		console.log(key , arr[key]) ;
	}


	// only access the indexed (numbered keys)
	for(let i = 0 ; i < arr.length ; i++){
		console.log(i , arr[i]) ;
	}



}

