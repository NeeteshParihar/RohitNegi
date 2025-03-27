{
  // understanding the the object

  // stores values in key values pair , the keys are the strings not the variable
  const user = {
    0: "its zero",
    1: "its one",
    name: "Neetesh",
    age: 21, // age is mapped with 21
    "account ballance": 100000,
    undefined: "it can happens", /// key is taken as the string
    null: "its null",
  };

  console.log(user);

  // two ways to access key's value
  console.log(user.name);
  console.log(user["name"]);
  // console.log(user."name") ;  syntax error

  console.log(user["account ballance"]); // mainly used for such identifiers who does'nt follows the naming rules
  console.log(user["0"]);
  console.log(user[1]);
  console.log(user["1"]);

  console.log(user.undefined);
  console.log(user.null);

  // hum jo bhi keys likhte hai bo as a strings treat hoti hai and ye kinds of keys hoti hai actual stored data ko access karne ki

  const newPerson = new Object();
  console.log(newPerson);

  // adding keys

  newPerson.name = "Neetesh";
  newPerson.password = ".kwjrngdbkj n";

  console.log(newPerson);

  // delete the property

  delete newPerson.password;

  console.log(newPerson);

  // another way to make object

  class student {
    constructor(name, age, year, sem) {
      this.name = name;
      this.age = age;
      this.year = year;
      this.sem = sem;
    }
  }

  const std1 = new student("Neetesh", 21, 2, 2);

  console.log(std1);
}

{
  // common methods of  an object

  const user = {
    name: "Neetesh",
    age: 21,
    email: "neeteshparihar2212@gmail.com",
    gender: "male",
    address: {
      address: "bhitarwar",
    },
  };

  // getting all the keys in the array

  const keys = Object.keys(user);

  console.log("printing the keys");
  console.log(keys);

  for (let key of keys) {
    console.log(user[key]);
  }

  // get all the values

  // returns arr of values
  const values = Object.values(user);
  console.log(values);

  // getting key value pairs

  // returns a 2d array
  const entries = Object.entries(user);
  console.log(entries);

  // understanding assign

  const obj1 = {
    a: 1,
    b: 2,
  };
  const obj2 = {
    c: 3,
    d: 4,
  };

  Object.assign(obj1, obj2); // obj1 mai obj2 ke pairs ko add kardo // only obj1 is modified

  console.log(obj1);
  console.log(obj2);

  // what if i dont want to modify obj1

  const obj3 = {
    a: 1,
    b: 2,
  };
  const obj4 = {
    c: 3,
    d: 4,
  };

  // it creates shallow copy
  const res = Object.assign({}, obj1, obj2); // empty obj mai dono assign kardo  // so {} is mai hi changes aayenge

  console.log(res);

  console.log(obj3);
  console.log(obj4);

  res.a = 100;

  console.log(res.a);
  console.log(obj3.a);

  const temp = { ...res };
  console.log(temp);
  temp.a = 10;
  console.log(temp.a);
  console.log(res.a);

  // go in details of assign and sprade operator
}
{
  const obj1 = {
    a: 1,
    innerObj: {
      a: 2,
    },
    getA() {
      return this.a;
    },
  };

  // creates shallow copy : menas kuch values are copied but kuch are shared with same memory
  const obj2 = Object.assign({}, obj1);

  console.log("using assign");
  console.log(obj2);

  console.log("is shallow using assign");
  console.log(obj2.innerObj == obj1.innerObj);
}

{
  // with sprade operator

  const obj1 = {
    a: 1,
    innerObj: {
      a: 2,
    },
    getA() {
      return this.a;
    },
  };

  const obj2 = { ...obj1 };

  console.log(obj1 == obj2);
  console.log("is shallow using sprade");

  console.log(obj1.innerObj == obj2.innerObj);

  console.log("copyied using sprade");
  console.log(obj2);
}

{
  // another way to create a deep copy

  const obj1 = {
    a: 1,
    innerObj: {
      a: 2,
    },
    getA() {
      return this.a;
    },
  };

  const obj2 = JSON.parse(JSON.stringify(obj1));
  // in this way function are removed

  console.log("copied using JSON");
  console.log(obj2);

  console.log(obj2.innerObj == obj1.innerObj);
}

{
  // creating deep copy : nested values bhi copy ho jayengi

  const obj1 = {
    a: 1,
    innerObj: {
      a: 2,
    },

    // getA(){
    // 	return this.a ;
    // }
  };

  // we cannot use structure clone if it has the methods
  const obj2 = structuredClone(obj1);

  console.log(obj2);

  console.log(obj1.innerObj == obj2.innerObj);
}
