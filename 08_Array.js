{
  // understanding the array

  const arr = [1, 2, 3, "Neetesh", false];

  // access values using index start from 0 to length-1
  console.log(arr[0], arr[arr.length - 1]);

  // .at can accept negative index
  console.log(arr[-1]); // undefined
  console.log(arr.at(-1)); // false

  console.log(arr);

  // we have created arr1 which holds the same array as arr holds so both are equal
  const arr1 = arr;
  console.log(arr1);
  console.log(arr1 == arr);
}

{
  // <---------------creating copies---------------------->

  const arr1 = [0, 1, 2, 3, 4, 5];
  const arr2 = structuredClone(arr1);

  console.log(arr2);
  console.log(arr2 == arr1);

  const obj1 = {
    name: "neetesh",
    inner: {
      age: 21,
    },
  };

  const obj2 = structuredClone(obj1);
  console.log(obj1 == obj2);
  console.log(obj1.inner == obj2.inner); // false means creates deep copy
}

{
  // <----------------array methods --------------------------->

  const arr = [0, 1, 2, 3, 4];

  arr.push(6); // add kardo last mai 6 ko
  console.log(arr);
  arr.pop(); // remove kardo last element ko
  console.log(arr.pop()); // also returns the removed element
  console.log(arr);

  // add at start using unshift

  arr.unshift(100);
  arr.unshift(101);
  console.log(arr);

  // remove from start using shift

  arr.shift();
  console.log(arr);
  console.log(arr.shift());
  arr.shift();
  console.log(arr);

  delete arr[0]; // deletes value but space is still in use

  console.log(arr);
  arr.shift();
  console.log(arr);
}

{
  // more methods

  const arr = [1, 2, 3, 4, 5, 6, 3, 2];

  console.log(arr.indexOf(3));
  console.log(arr.lastIndexOf(3));
  console.log(arr.includes(3));
  console.log(arr.includes(100));
  console.log(arr);

  console.log(arr.slice(2, 6));
  console.log(arr.splice(2, 4)); // second index se 4 values chahiye
  console.log(arr);

  console.log([1, 2, 3, 4].slice(0, 1000));
  console.log([1, 2, 3, 4].splice(0, 100)); // splice modifies the original array // remove kardeta hai us part ko jo manga hai
  console.log([1, 2, 3, 4].splice(-1, 4));
  console.log([1, 2, 3, 4].splice(0, 0));

  const arr3 = [0, 1, 2, 3, 4, 5];
  arr3.splice(2, 3, "Neetesh", "Parihar", "1", "433"); // index 2 se 3 values delete kardo and given values ko add kardo jaha pe deletion hua hai
  // result : [1 ,2 , ..... , 5] ..... is the area which is deleted and given values are added

  console.log(arr3); // [1,2,5]

  console.log([1, 2, 3, 4].toString());

  console.log([1, 2, 3, 4].join(" * * "));
}

{
  // concate two arrays

  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  const arr3 = arr1.concat(arr2);
  console.log(arr1);
  console.log(arr2);
  console.log(arr3);

  console.log([1, 2, 3, 4].concat([5, 6, 7], [8, 9, 10]));

  arr1.push(arr2);
  console.log(arr1);
}

{
  // 2d array

  const arr = [
    [12, 34],
    [1, 2],
  ];
  console.log(arr);
  console.log(arr[0][0]);

  console.log(arr.flat()); // convert into 1D array

  const arr3d = [[[12, 3]]];

  console.log(arr3d.flat(2)); // 2 levels tak

  console.log(arr3d.flat(Infinity));
  console.log(arr3d.flat(-5)); // for negative it does nothing

  // check if dataStructure array or not
  console.log(Array.isArray([1, 2, 3]));
  console.log(Array.isArray({}));
}

{
  // creating array using new

  const arr = new Array(1, 2, 3, 4);
  console.log(arr);

  const arr2 = new Array(5); //  empty array of size 5 created
  console.log(arr2);

  const arr3 = new Array(10).fill(false); // create empty array of size 10 and fill it with false
  console.log(arr3);

  // array does not stored in continus memory location bcz of dyncamic nature
  // if changed then it can take more space then we jave to shift all values
}

{
  console.log([[12, 13]].flat(0));
  console.log([[1, 2]].flat(1));
}

{
  function flat(arr) {
    if (!Array.isArray(arr)) {
      return [arr];
    }
    let flatArray = [];

    for (let val of arr) {
      const flatArrayVal = flat(val);
      flatArray = flatArray.concat(flatArrayVal);
    }

    return flatArray;
  }

  console.log(flat([1, 2, 3]));
  console.log(flat([1, 2, [1, 2, 3, 4, [1, 2, 3, 4]], 3]));

  function flatDimension(arr, levels) {
    if (!Array.isArray(arr)) return [arr];
    if (levels <= 0) return arr;

    const ans = [];

    for (let val of arr) {
      const flatVal = flatDimension(val, levels - 1);
      ans.push(...flatVal);
    }

    return ans;
  }

  function flat(arr) {
    if (!Array.isArray(arr)) {
      return [arr];
    }
    let flatArray = [];

    for (let val of arr) {
      const flatArrayVal = flat(val);
      flatArray = flatArray.concat(flatArrayVal);
    }

    return flatArray;
  }

  console.log(flat([1, 2, 3]));
  console.log(flat([1, 2, [1, 2, 3, 4, [1, 2, 3, 4]], 3]));

  function flatDimension(arr, levels) {
    if (!Array.isArray(arr)) return [arr];
    if (levels <= 0) return arr;

    const ans = [];

    for (let val of arr) {
      const flatVal = flatDimension(val, levels - 1);
      ans.push(...flatVal);
    }

    return ans;
  }

  console.log(
    flatDimension(
      [
        [1, 2],
        [1, 2],
      ],
      2
    )
  );
  console.log(flatDimension([[[1], [2], [3]]], 0));
  console.log(flatDimension([[[1], [2], [3]]], 1));
  console.log(flatDimension([[[1], [2], [3]]], 2));
  console.log(flatDimension([[[1], [2], [3]]], 3));
}
