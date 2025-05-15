
// async function hamesha promise return karta hai , chahe promise object hum return kare ya koi other value it makes it promise 

const p1 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p1 resolved");
    }, 3000)
})

// what happens when we create a promise but neither reject it and resolve it 

const p2 = new Promise((res , rej)=>{

   setTimeout(()=>{
    res("p2 is resolved");
   },3000) 
    
})


const initialTime = new Date() ;

async function fn1() {
    console.log("wating...");
    try {
        const message = await p1; //  jab tab p1 resolved nahi hota wait karo 
        console.log(message);

        const message2 = await p1; // wait nahi karega kyoki promise state is not pending 
        console.log(message);
    }
    catch (message) {
        console.log(message);
    }
}

function getWatingTime(initialTime , waitingTime ){
    return waitingTime - (new Date() - initialTime) ;
}

async function fn2(p1 , p2) {

    try{
        console.log("wating..." , getWatingTime(initialTime , 5000)) ;
        const message = await p2 ; // it have waited for 5 secs 
        console.log(message) ;
        
        console.log("wating..." , getWatingTime(initialTime , 5000)) ;

        const message2 = await p1 ; // so kyoki ye bhi 5 seconds lene wala 5 secs tha islye ye bhi resolve ho gaya 
        console.log(message2) ;




    }catch(message){
        console.log("inside catch") ;
        console.log(message) ;
    }   


} 

fn2(p1 , p2) ;


async function fn3() {
    return "Neetesh Parihar";    
}


console.log(fn3());
fn3().then(data=>console.log(data));


