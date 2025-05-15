

function test(message, watingTime) {

    return new Promise((res, rej) => {

        setTimeout(() => {
            res(`${message} resolved`);
        }, watingTime);

    })


}



async function greet() {

    console.log("greeting you!");

    try {
        console.log("wating...");

        // const p1 = await test("p1" , 5000) ;
        // console.log(p1);

        // const p2 = await test("p2" , 5000);
        // console.log(p2);        

        // we can execute them parallaly , maximum time = maximumtimeToResolves(p1 , p2) ;

        const initialTime = new Date();
        const [data1, data2] = await Promise.all([test("p1", 3000), test("p2", 5000)]);
        console.log(new Date() - initialTime);
        console.log(data1);
        console.log(data2);


    } catch (err) {
        console.log(err);
    }
}

greet();

console.log("hello1");
console.log("hello2");


const time = new Date();
// try ot execute blocking code as async task 
// while(new Date() - time <= 10000){

// }



/* 


 explaination of how this code execuited can be found in the notebook



 */