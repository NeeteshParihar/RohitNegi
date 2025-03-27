{
  // deeply understanding the object

  const obj1 = {
    name: "Neetesh",
    balance: 10000,
  };

  // the memory address of obj1 is given to obj2 ( both have same memory refrence) // often called shallow copy
  // shallow copy : some data is not copied but shared in the memory
  const obj2 = obj1;

  obj2.balance += 10000;
  console.log(obj1.balance); // the balance of obj1 is changed

  // more example of shallow copy

  let user1 = {
    name: "Neetesh",
    email: "neeteshparihar22@gmail.com",
    address: {
      pincode: 452017,
      city: "indore",
      street: "iet davv indore ",
      road: "khandwa road",
    },
  };

  // const user2 = user1     we not just giving the refernce to user2 to access the user1

  // creating shallow  copy1

  const user2 = { ...user1 };
  console.log("check user1 and user2");

  console.log(user2 == user1);
  console.log(user1.address == user2.address);  // the address nested object is shared btw user1 and user2 


  // creating shallow copy2 

  const person1 = {
	name : "Neetesh" ,
	education : {
		school : "city child high school" ,
		graduation : "iet davv indore"
	}
  }

  const person2 =  Object.assign({} , person1) ;
  console.log(person1 == person2) ;
  console.log(person1.education == person2.education)  ; // true , bcz eduction is shared btw both objects 
  
}
{
	// using destructing syntax to get the values 

	const user1 = {
		name : "Neetesh" , 
		age : 21 ,
		address :  "\'iet davv\'"
	}

	// asking : mujhe name and address keys ki values de do 
	const {name , address} = user1 ;
	console.log(name , address) ;

	// modifying the identifiers names 

	// user1 mai se age lekar uman mai daal do 
	const { age : umar , address : pata} = user1 ;

	 // console.log(age) ;cannot access through age its not defined 

	 console.log(umar) ;
	 console.log(pata) ;


	const person1 = {

		name : "Neetesh" ,
		age : 21 ,
		school : "city child high school" ,
		graduation : "iet davv indore",
		address : ";ergnbf in"

	} 

	// name and age directly lelo and bache hui values ko ek object mai daal do
	const {name:Name , age ,  ...obj1} = person1 ;

	console.log(Name , age , obj1) ;





 
}

{

	// destructuring the array 
	const arr = [1,2,3,4,4,5] ;

	// oth and 1st value 
	const [a , b ] = arr ;
	console.log(a , b) ;

	// 2nd value 
	const [ , , c ] = arr ;
	console.log(c) ;

	// oth , 1st and rest are in otherValues 
	const [ x , y , ...otherValues] = arr ;
	console.log(x , y ,otherValues) ;

	// destructing nested object 

	//1 
	let user1 = {
		name: "Neetesh",
		email: "neeteshparihar22@gmail.com",
		address: {
		  pincode: 452017,
		  city: "indore",
		  street: "iet davv indore ",
		  road: "khandwa road",
		} ,
		arr : [12,3,4] 
	}

		// address lekar destructure kar do 
	const {address:{pincode , city}} = user1 ;	

	console.log(pincode) ;
	console.log(city) ;

	// 2 

	const {road , street} = user1.address ;
	console.log(road , street) ;

	const { arr : [arrVal]  }= user1 ;

	console.log(arrVal) ;


	const rabbit = {
		type : "whiteRabbit" ,

		greet: function(){
			console.log("hello bro") ;
			return this ;
		},

		sound(){
			console.log("rabbit speaks") ;
		}
	}


	console.log(rabbit.greet().sound()) ;



}

{

	//understanding the protopyes 

	const rabbit = {
		type : "whiteRabbit" ,

		greet: function(){
			console.log("hello bro") ;
			return this ;
		},

		sound(){
			console.log("rabbit speaks") ;
		}
	}

	console.log(rabbit.type) ;  // type is the proerty of object and we mentioned that 

	console.log(rabbit.toString()) ;  // we didn't mentioned this property // this comes from the object prototype which is also an object and act as the source of fallback properties

	// check the inherited properties 

	console.log(rabbit.__proto__) ; // check this in the console 


}

{
	// try to run this in the browser console 

	let user1 = {
		name : "Neetesh" 
	}

	let user2 = {
		age : 21 
	}

	// user2 ko user1 se bana do ( user2 can access the properties of user1 but not vice -versa )
	user2.__proto__ = user1 ;

	console.log(user2.name , user2.age) ;

	user1.name = "NEETESH" ;
	console.log(user2.name ) ;


	const arr = [ 1,2,4] ;

	// both are same 
	console.log(arr.__proto__) ;
	console.log(Object.getPrototypeOf(arr)) ;

	// Array is the constructure that has the object called prototype and this is used to make the other arrays 
	console.log(Array.prototype) ;  // same as arr.__proto__


	// the Array is also made from Object.prototype 


	console.log(arr.__proto__ == Array.prototype) ;
	console.log(Array.prototype.__proto__ == Object.prototype) ;

	// Object bhi ek constructor hai jiske pass prototype naam ka object hai ( bo root object hai prototype tree mai )
	// Object.prototpe ka koi bhi protoptype nahi hota 

	console.log(Object.prototype.__proto__ == null) ;




}
