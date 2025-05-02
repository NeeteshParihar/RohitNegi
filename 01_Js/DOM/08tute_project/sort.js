
// sorting function in js 

const arr = [ 10 , 20 , 100 , 200] ;

arr.sort() ;

console.log(arr) ;



// the sort function treates the elements as the string so and compares the string via asci values 


const arr2 = [10 , 20 , 100 , 200] ;
arr2.sort((a , b)=> a - b ) ;
console.log(arr2) ;


// first 10 and 20  will be taken  
// for a-b > 0 , it arranges them as b a bcz b is small
// for a-b == 0  : a then b , both are equal 
// for a-b < 0 , means a is small 


// sorting in desending order 

arr2.sort((a , b)=>{
    if(a - b < 0) return  1 ;
    else if( a - b > 0) return -1 ;
    return 0 ;
})


console.log(arr2 ) ;



const arr3 = [1 ,2 ,3 ,4 ,5 ] ;

// reverseing the array 

function swap(i ,j , arr){
    [arr[i] , arr[j]] = [arr[j] , arr[i]] ;
}

let i = 0 , j = arr3.length-1 ;

while(i < j){
    swap(i , j , arr3) ;
    i++ , j-- ;
}


console.clear() ;
console.log(arr3) ;

