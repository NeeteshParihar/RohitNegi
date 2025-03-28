{
  // control-flow statments

  // sun (0) , mon(1) ... sat(6)

  let date = new Date().getDay();

  const randomDate = Math.floor(Math.random() * (date + 2));

  console.log(randomDate);

  // jo value pass ki hai bo stricty compare hoti hai  (===)  so 5 !== "5" here
  switch ("0") {
    default:
      console.log("not a valid day");
      break;
    case 0:
      console.log("sunday");
      break;
    case 1:
      console.log("monday");
      break;
    case 2:
      console.log("tuesday");
      break;
    case 3:
      console.log("wednesday");
      break;

    case 4:
      console.log("thursday");
      break;
    case 5:
      console.log("friday");
      break;
    case 6:
      console.log("saturday");
      break;
  }

  // agar har ke break  statement hata de and val = 0 pass kare then all cases run hoenge including default
  // default ko mai kahi bhi likh sakta hoo and agar usme se break hata de and default bala case run ho then neeche wala case bhi run ho jayega

  // single statment
  for (let i = 0; i < 10; i++) console.log(`Hello ${i}th world`);
}

{
  // scope : functional scope , block scope and glbal scope

  // 1.functional scope

  // let and const are accesible just after there declaration line

  function fn1() {
    let a = 6;
    const b = 10;
    var c = 100;
  }

  try {
    console.log(a);
  } catch (error) {
    console.log("a sirf function ke andar hi accessible h");
  }

  try {
    console.log(b);
  } catch (error) {
    console.log("b sirf function ke andar hi accessible h");
  }

  try {
    console.log(c);
  } catch (error) {
    console.log("c sirf function ke andar hi accessible h and its var ");
  }
}

// ye apni declaration line ke upar bhi accesible hota hai but without value ( this called hoisting)
console.log(age);

{
  // problem with var : w will never use this

  console.log(age);

  console.log(age);
  var age = 20;
  var age = 50;

  // ek hi naam se multiple variables within same scope
  console.log(age);

  {
    var age = 5;
  }

  console.log(age); // again naya age ban gaya with value 5 , this behaviour can invite bugs in the programs

  let amount = 50;

  {
    // console.log(amount) ;  nahi use kar sakte kyoi hamne is scope mai amount decalre kar diya hai so
    // priority local variable ko milti hai and amount accessible nahi hota jo is block mai nahi hai

    let amount = 5;
    console.log(amount);
  }

  // yaha pe local variable accessible nhai hai , kuoki bo yaha exist hi nahi karta
  // scope : also defines the existence

  console.log(amount);
}

{
  // hoisting in functions

  greet1(); // classical function decalre hone se pehle bhi accessible hota hai and baad mai bhi

  function greet1() {
    console.log("hello 1");
  }

  greet1();

  try {
    greet2();
  } catch (error) {
    console.log("greet2 not accessible");
  }

  const greet2 = function () {
    console.log("hello 2");
  };

  greet2();

  try {
    greet3();
  } catch (error) {
    console.log("greet3 not accessible");
  }

  const greet3 = () => {
    console.log("hello 3");
  };

  greet3();

  let i = 0;
  // do while loop atlest ek baar to chalta hui hai
  do {
    console.log("hello ", i);
  } while (i < 0);
}
