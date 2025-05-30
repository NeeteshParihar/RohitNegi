import express from "express";

const app = express();
const PORT = 5008;
const hostname = "localhost";

// ❌ Don't use any body-parsing middleware like express.json()

// app.use(express.json()); see what happen if i un-comment this 

 /* 
 
 in this code i did'nt used middleware app.use(express.json()) ;
 the working of this middleware  to read the stream of data from request , then after  parsed it into object 
 and add a property in req object called body and req.body = parsedData , this way our middle ware works 

 below i did this thing manually 
 
 */

app.post("/raw", (req, res) => {

    console.log(req.hasOwnProperty("body")); // false // means req mai body property inject ki jaati hai 
    

    let rawData = "";

    // Listen for data chunks
    req.on("data", (chunk) => {
        rawData += chunk;
    });

    // When data fully received
    req.on("end", () => {
        console.log("Raw Data:", rawData);

        // Optionally, try to parse JSON manually
        try {
            const parsed = JSON.parse(rawData);
            console.log("Parsed:", parsed);
        } catch (err) {
            console.error("Invalid JSON");
        }

        res.send("Raw data received");
    });
});

app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}`);
});
