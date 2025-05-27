


const p1 = new Promise((res , rej)=>{
    res("hello");

    const time = new Date() ;

    while( new Date() - time < 5000){

        console.log("blocing promise");


    }


})

console.log(p1) ;




















