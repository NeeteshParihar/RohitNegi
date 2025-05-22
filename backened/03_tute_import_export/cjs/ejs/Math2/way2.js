
function abs(val){
    return (val < 0) ? -1*val : val ;
}

function fact(val){
    let ans = 1 ;
    for(let i = 1 ; i <= val ; val++){
        ans*=i;
    }
    return ans ;
}


export {abs , fact } ;

// we can also mention export before the function 






