// for of loop is used to iterate over the values , ( cannot be used by the object)

{
  // first key is 0 , so the next index   can easily be derived  but object mai mujhe nahi pata hota ki next value kya hogi
  for (let val of [1, 2, 3]) {
    console.log(val);
  }

  const values = Object.values({ name: "neetesh" });
  console.log(values);

  // understanding the call-back functions
  // it is the normal function that is passed as the argument to the function

  function sum(arr, fn) {
    return fn(arr);
  }

  function fn(arr) {
    let sum = 0;
    for (let val of arr) {
      sum += val;
    }

    return sum;
  }

  const ans = sum([1, 2, 3, 4, 5], fn); // here fn is the callback function

  console.log(ans);

  // setInterval --> its an inbuilt method and globally available in the file
  // usecase : Repeatative interval function calls

  // suppose mujhe har 5 seconds == 5000 milisec mai mujhe kuch kaam karna hai then ise use karnge

  // setInterval ek asyncronus function hai

  setInterval(() => {
    console.log("hello");
  }, 5000);

  // forEach method : har ek index ke liye chalega

  const arr = ["hello", "kjgbd", "kjgfb", "lkjgjb"];
  // expects a callback function

  // does not returns anyhting
  const val = arr.forEach((value, index, arr) => {
    console.log(value);
  });

  console.log(val);

  // filter : returns a filtered array , har ek value ko lena h ya nahi bocall function se hota h

  // jab koi bhi value nhi return hoti to undefined hota hai , and it means false
  let tempArr = [10, 9, 8, 7, 6, 5].filter((val, index, arr) => {
    if (val % 2 == 0) return true;
    else return false;
  });

  console.log(tempArr);

  tempArr = [10, 9, 8, 7].filter((val) => val % 2 == 0);

  console.log(tempArr);

  // map in array : return array of same size by modifying the values

  tempArr = [20, 19, 18, 17, 16, 15].map((val, index, arr) => {
    return `<h1>${val}</h1> `;
  });

  console.log(tempArr);
}

{
  const std = [
    {
      name: "a",
      rolln: 5,
	  m : 4
    },
    {
      name: "b",
      rolln: 1,
	  m : 3
    },
    {
      name: "c",
      rolln: 2,
	  m : 5 
    },
    {
      name: "d",
      rolln: 3,
	  m : 0 
    },
    {
      name: "e",
      rolln: 4,
	  m : 9
    },
    {
      name: "g",
      rolln: 10,
	  m : 2
    },
  ];

  // wants student with marks greater than 3 

  const filtered =  std.filter(({m})=>m > 3) ;

  const res = filtered.map( (std)=>{
	return {
	    name : std.name ,
		rollno : std.rolln

	}
  })
  

  console.log(res) ;

}
