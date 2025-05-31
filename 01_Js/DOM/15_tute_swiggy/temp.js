
const fs = require("fs");

const names = [
  // International Chains
  "KFC",
  "Pizza Hut",
  "Burger King",
  "McDonald's",
  "Domino's Pizza",
  "Subway",
  "Starbucks",
  "Taco Bell",
  "Wendy's",
  "Chick-fil-A",
  "Dunkin'",
  "Papa John's",
  "Chipotle",
  "Five Guys",
  "Panda Express",

  // South Indian Restaurants
  "Sagar Ratna",
  "MTR",
  "A2B (Adyar Ananda Bhavan)",
  "Hotel Saravana Bhavan",
  "Dosa Plaza",
  "Namma Veedu Vasanta Bhavan",
  "Ratna Cafe",
  "Murugan Idli Shop",

  // North Indian Restaurants
  "Bukhara",
  "Gulati Restaurant",
  "Pind Balluchi",
  "Karim's",
  "Punjabi By Nature",
  "Chandni Chowk Delights",
  "Kake Da Hotel",
  "Haldiram's",

  // Creative/Fictional Names
  "The Golden Fork",
  "Spice Symphony",
  "Urban Tadka",
  "The Hungry Hippo",
  "Fork & Flame",
  "Olive & Thyme",
  "The Rustic Spoon",
  "Mango Tree Bistro",
  "Salt & Pepper House",
  "Ocean's Catch",
  "Firewood Grill",
  "Taste of Tuscany",
  "Basil & Barrel",
  "The Noodle Nest",
  "Red Lantern Lounge",
  "The Green Bowl",
  "Harvest Moon Diner",
  "Chopstick Express",
  "The Daily Bite",
  "The Midnight Bite",
  "Mama Mia Kitchen",
  "Pho Ever",
  "The Bento Box",
  "The Secret Sauce"
];



const path = "./newRests.json";

function readFile(path){

    try{

        const res = fs.readFileSync(path  , 'utf-8');
        const data = JSON.parse(res);
        return data ;

    }catch(err){
        console.log(" read err");
    }
}

function writeToFile(path , data , names ){

    try{

        const rests = data ;

        let index = 0 ;

        rests.forEach(rest=>{
            rest.restaurantName = names[index++];
            index = index%(names.length);
        console.log(rest.restaurantName);

        })

        fs.writeFileSync(path , JSON.stringify(rests));


    }catch(err){
        console.log(" write err");

    }

}

const data = readFile(path);
writeToFile(path , data , names );

