

 export function filter(arr , fn){
    let ans = arr.filter((val)=>fn(val));
    return ans ;
}


