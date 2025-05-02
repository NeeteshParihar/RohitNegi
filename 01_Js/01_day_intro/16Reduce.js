
{

	// reduce method gives a single reduced value

	const arr =  [ 1,2,3,4,5] ;

	const sum = arr.reduce( ( accumulator , curr , index , arr)=>{
		// console.log(index , arr) ;
		return accumulator+curr ;
	} , 0) ;

	console.log(sum) ;

	// accumulator : the variable holding the result 	
	// curr --> arr values taken from left to right 


	const sum2 = arr.reduce((acc , curr)=>acc+curr) ;
	console.log(sum2) ;
	



	// use case : return an object with the counts of each things 

	const fruits = ["a" ,"b" , "c" , "d" , "a" , "c" , "b" , "a" , "e" ] ;

	const obj = fruits.reduce(  (acc , curr)=>{

		if( curr in acc){
			acc[curr]++ ;
		}else{
			acc[curr] = 1 ;
		}

		return acc ;


	}, {})


	console.log(obj) ;

	// another way to check if the propertyr exist in the object 

	console.log(obj.hasOwnProperty("a")) ;
	console.log(obj.hasOwnProperty("Neetesh")) ;

}

{
	// set : stores unique values 

	const set1 = new Set([1,2,3,4]) ;

	console.log(set1) ;
	// add values 
	set1.add("Neetesh") ;
	set1.add(1) ;   // not added

	console.log(set1) ;	
	console.log(set1.size) ;
	set1.delete("Neetesh") ;
	console.log(set1.size) ;
	console.log(set1) ;
	console.log(typeof set1) ;

	set1.delete("Neetesh") ; // "Neetesh" is not present 

	console.log(set1) ;


	// find if a value is present or not 

	if(set1.has("Neetesh")){
		console.log(`username found`) ;
	}else{
		console.log(`username not found`) ;
	}

	// remove all the values from set 

	set1.clear() ;
	console.log(set1 , set1.size ) ;


	set1.add(1) ;
	set1.add(12) ;
	set1.add(13) ;
	set1.add(14) ;
	set1.add(15) ;
	set1.add(16) ;
	set1.add(18) ;
	set1.add(19) ;

	// can we iterate the set


	console.log("for of loop for sets")
	for( let val of set1){
		console.log(val) ;
	}


	console.log("for in for sets")
	for( let val in set1){
		console.log(val) ;
	}



	// converting set1 into arr

	const arr = new Array(set1) ;  // it makes array of singles element set
	console.log(arr) ;

	for( let val of arr){
		console.log(val) ;
	}

	const arr2 = [...set1] ;

	console.log(arr2) ;


	const union = new Set( [...set1 , ...(new Set([10,11,12]))] ) ;

	console.log(union) ;


	// taking intersection

	const set2 = new Set([1,2,3,4,5,6]) ;	

	const ans = [] ;

	for(let val1 of set1){
		if(set2.has(val1))ans.push(val1) ;
	}

	console.log(ans) ;

	// another way to take intersections : shorcuts

	const set3 = new Set( [1,2,3,4,5] ) ;
	const set4 = new Set( [3,4,5,6]  ) ;


	// 1. convert into arr 2. apply filter , if value is present in set2 it return true and the value is taken
	let temp = [...set3].filter((val)=>set4.has(val)) ; 
	const intersection = new Set(temp) ;
	console.log(temp) ;

	console.log(intersection) ;

	// for each is also in the set

	set3.forEach((val)=>console.log(val)) ;



}

{

	// Map : stores dataTypes in key-value pairs like number : boolean 
	// unlike js objects : which stores string : with any datatype 

	const map1 = new Map() ; 

	console.log(typeof map1) ; // obj 

	// add pairs

	map1.set(1 , true) ;
	map1.set("1" , false) ;
	map1.set("Neetesh" , 50) ;

	map1.set("Neetesh" , 90) ; // updates the key value 


	console.log(map1) ;

	map1.delete("Neetesh") ;
	console.log(map1.has("Neetesh")) ;
	console.log(map1.size) ;

	map1.clear() ;

	//map also maintain the order in which pairs are inserted

	// another way to create map 

	const map2 = new Map( [  [1 , false] , ["Neetesh" , 21] , ["banana" ,30]   ]) ;

	console.log(map2) ;

	for( let pair of map2){
		console.log(pair , Array.isArray(pair)) ; // true 
		console.log() ;
	}
 

	// destructuring the pair 
	for( let [key , value] of map2){
		console.log( `${key} : ${value}`) ;
	}

	console.log(map2["Neetesh"]) ;
	console.log(map2.get("Neetesh")) ; 


	// accessing the value of the key

	console.log(map2.get("Neetesh"))


}