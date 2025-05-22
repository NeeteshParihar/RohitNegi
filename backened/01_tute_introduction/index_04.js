
console.log("temp1");

function smallestIndex(arr , start , end){
    let ans = start ;

    for( let i = start ; i <= end ; i++){
        if(arr[ans] > arr[i]) ans = i ;
    }

    return ans ;

}

function swap(arr , i , j){
    
    console.log(`swapped : ${i}, ${j}`);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp ;
}


function sort(arr){

    for( let i = 0 ; i < arr.length ; i++){
        let index = smallestIndex(arr , i , arr.length-1) ;
        swap(arr , i , index) ;
    }
}

module.exports = {sort} ;