

export function getUniqueID(arr){

    const id = arr.reduce((ans , val)=>{
        if(ans <= parseInt(val.id)) ans = 1+parseInt(val.id);
        return ans ;
    }, 0);

    return id ;
}