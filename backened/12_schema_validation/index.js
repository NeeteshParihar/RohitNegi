
import connectDatabase from "./database.js";
import { mongoose, url, express, PORT, Users } from "./packages.js";  // Users is a model used to refer to the collection 

import app from "./server.js";
import validator from "validator"; // check sybtax of mail id correct or not 
import nodemailer from "nodemailer"; // helps us send email 


// create a transport to send email


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "neeteshparihar22@gmail.com",
        pass: "G2taParihar#"
    }
});



async function sendConfirmationMail(from, to, subject, html) {

    try {

        await transporter.sendMail({
            from,
            to,
            subject,
            html
        })

        console.log("mail sent successfully");

    } catch (err) {
        console.log(err);
    }

}



const database = "Instagram";
const targetUrl = `${url}${database}`;

connectDatabase(targetUrl); // connect to the databse 
app.use(express.json());  /// use the middleware to parse incomming stream

function isValidMailFormat(mailId) {

    return validator.isEmail(mailId);

}


// app.use((req, res, next) => {

//     if (req.method === "POST" && !isValidMailFormat(req.body.emailId)) {
//         res.status(400).send("enter correct mailId please");
//         return;
//     }

//     next();

// })



app.post("/register", async (req, res) => {

    try {

        const { body: newUser } = req;

        // console.log(newUser);

        // api level validation : benefits --> 1.db calls decreses 2.latency reduce ,  calls is directly propotional to the cost 

        const mantoryFields = ["firstName" , "email" , "password"];
        const isAllPresent = mantoryFields.every((field)=>Object.keys(newUser).includes(field));  // every checks each array element that they follow a particluar property


        if(!isAllPresent)
                throw new Error("fields are missing!");


        const ans = await Users.create(newUser);

        sendConfirmationMail("23bit044@ietdavv.edu.in", newUser.emailId, "registration", "<p>Click <a href='https://yourapp.com/verify'>here</a> to verify</p>")

        res.status(201).send(ans);

    } catch (err) {


        if (err.name === "ValidationError") {
            res.status(400).send({ error: "validation failed", message: err.message });
            return;
        }

        console.log(`err in post request at /register : ${err.message}`);
        res.status(500).send(err.message);
    }

})

// even when the immutable fields are changed the request goes to db but without the immutable feild
app.patch("/user", async (req, res) => {


    try {

        const { body: { _id, ...data } } = req;

        console.log(data);

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send("Invalid ID format");
        }
        const options = {
            runValidators: true,
            new: true // optional: return the updated doc
        }

        const user = await Users.findByIdAndUpdate(_id, data , options);      // returns old object after updating

        if (!user) {
            console.log(user);
            res.status(404).send("user not found");
        } else {

            res.status(200).send(user);

        }



    } catch (err) {
        console.log(` error on the patch /user`, err.message);
        res.status(500).send(err.message);
    }


})

app.delete("/user/:id", async (req, res) => {

    try {

        const { params: { id } } = req;
        console.log(id);
        const ans = await Users.findByIdAndDelete(id); // returns null is not found 

        if (!ans) res.status(404).send("user not found");
        else res.status(200).send(ans);


    } catch (err) {

        console.log(` error on the delelte /user/:id`, err.message);
        res.status(500).send("internal error");
    }
})


app.get("/user/:id", async (req, res) => {

    // generate new user id 

    // res.status(200).send(user);
    // const newID = new mongoose.Types.ObjectId();
    // console.log(newID);



    try {

        const { params: { id } } = req;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format");
        }

        const user = await Users.findById(id); // returns null is not present


        if (!user) {
            console.log(user);
            res.status(404).send("user not found");
        } else {

            res.status(200).send(user);

        }



    } catch (err) {
        console.log(` error on the get /user/:id`, err.message);
        res.status(500).send("internal error"); 
    }
})


app.get("/info", async (req, res) => {

    try {

        const { query } = req;
        const data = await Users.find(query);

        res.status(200).send(data);

    } catch (err) {
        console.log(`error at get at /info , err : ${err.message}`);
    }

})


app.use("/", (req, res) => {
    res.status(404).send("that source does'nt exists");
})



app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`);
})

