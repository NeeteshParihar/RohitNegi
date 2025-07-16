
// server , odm , userSchema 

import express from "express";
import mongoose from "mongoose";
import rateLimit from 'express-rate-limit';
import url from "./connectionString.js";
import validator from "email-validator";
import bcrypt from "bcrypt";


// we can alos use validator library 

async function getHashCode(password, round = 10) {

    const hasCode = await bcrypt.hash(password, round); // we will store this has code in the db 
    // hascode is used to validate user password as it have round , salt info 

    return hasCode;

}

async function validateUser(password, hasCode) {
    const valid = await bcrypt.compare(password, hasCode);
    return valid;
}

async function validateEmail(req, res, next) {

    try {

        const { body: { emailId } } = req;

        const isValid = validator.validate(emailId);

        if (!isValid) {
            end(res, "email is not valid", 400);
            return;
        }

        next();


    } catch (err) {
        end(res, "internal server error", 500);

    }

}


const getPasswordErrors = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("less than  8 characters");
    if (!/[a-z]/.test(password)) errors.push("atleast 1 lowercase letter");
    if (!/[A-Z]/.test(password)) errors.push("At least 1 uppercase letter");
    if (!/\d/.test(password)) errors.push("At least 1 number");
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push("At least 1 special character");
    }
    return errors.length ? errors : null;
};


async function validatePassword(req, res, next) {
    try {

        const { body: { password } } = req;

        const missing = getPasswordErrors(password);

        if (!missing) next();
        else {
            end(res, { err: "weak passwrod", missing });
            return;
        }


    } catch (err) {
        console.log("error in validate pass middleware");
        end(res, "internal server error", 500);

    }
}


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per minute
    message: "Too many requests, please try again later."
})

function end(res, ans, code = 200) {
    res.status(code).send(ans);
}

const database = "Instagram";
mongoose.connect(`${url}${database}`);

// create a schema 

async function isValidName(name) {

    for (let ch of name) {
        if (!((ch >= 'a' && ch <= 'z')
            || (ch >= 'A' && ch <= 'Z'))) {
            return false;
        }
    }

    // console.log(name);

    return true;
}

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,

        // custor validators
        validate: {
            validator: isValidName,
            message: name => `${name.value} is not a valid first name it should only contain alphabets`
        },
        minLength: 3,
        maxLength: 20, // data validation --> it can throw error
        trim: true  // data sanitization  -> it can't
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: isValidName,
            message: `{VALUE} is not a valid lastName`
        }

    },
    age: {
        type: Number,
        min: 18,
        max: 35

    },
    gender: {
        type: String,

        // this is also a validator 
        // enum : ['male' , 'female' , 'others']
        enum: {
            values: ['male', 'female', 'others'],
            // message : prop=>`@{prop.value }is not a valid gender` this gives us more control object but not that which is sent by user

            message: `{VALUE} is not a valid gender`
        }
    },
    emailId: {

        type: String,

        immutable: true,
        unique: true,  // tell mogodb to make it as index along with other
        // 
        required: true,

        // data sanitization
        trim: true,
        lowercase: true,


    },
    password: {
        type: String,
        required: true

    },
    photo: {
        type: String,
    }

},
    {
        timestamps: true

    })


const Engineers = mongoose.model("engineers", userSchema);



const app = express();
const Port = 5008;

app.use(express.json());
// app.set('trust proxy', true);

app.use(limiter);



/* 
   required field absence throws error and no db call made
   if mongoose throws error due to data validation then db calls does not happens as validation is done bfr 
   
   data sanitization: transforming the data like trim()
   does not throw's error

   // about the unique schema property or keyword 
   1. if it tell mongodb to create index using the unique field 
   2. but if mongodb finds the the duplicacy it wont implement that
   3. so for to be sure create unique field and create index when you first connects to collection this prevents errors


 */

// always keep it async to handle concurrent requests
app.patch("/engineer", async (req, res) => {

    try {

        const { body: { _id, ...newData } } = req;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new Error(`invalid id ${_id} of ${_id.length} characters recieved , expected 24 hexadecimal char`);
        }

        const options = {
            runValidators: true,
            new: true // optional: return the updated doc
        }


        const engineer = await Engineers.findByIdAndUpdate(_id, newData, options);


        if (!engineer) {
            console.log(engineer);
            res.status(404).send("engineer not found");
        } else {

            res.status(200).send(engineer);

        }




    } catch (err) {
        end(res, err.message, 500);
    }

})

app.post("/login", validateEmail, async (req, res) => {

    try {

        const { body: { emailId, password } } = req;

        const user = await Engineers.findOne({ emailId });
        const valid = await validateUser(password, user.password);


        if (!valid) {
            end(res, "invalid credentials", 400);  // to avoid attackers donot send invalid password
            return;
        }

        console.log(user);

        end(res, { ...user, password }, 200);

    } catch (err) {
        end(res, err.message, 500);
    }
})

app.post("/register", validateEmail, validatePassword, async (req, res) => {

    try {

        const { body: newEngineer } = req;

        // the user schema is validated and its a authenticate request 

        const hasCode = await getHashCode(newEngineer.password);

        const ans = await Engineers.create({ ...newEngineer, password: hasCode });
        end(res, ans, 201);

    } catch (err) {
        end(res, err.message, 500);
    }
})

app.get("/info/:id", async (req, res) => {

    try {

        const { params: { id } } = req;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`invalid id ${id} of ${id.length} characters recieved , expected 24 hexadecimal char`);
        }


        const engineer = await Engineers.findById(id);
        if (engineer) res.send(engineer);
        else res.send("no engineer found");


    } catch (err) {

        res.status(500).send({
            message: "some error occured",
            err: err.message,
            stack: err.stack
        });
    }

})

app.get("/info", async (req, res) => {

    try {

        const { query } = req;
        const data = await Engineers.find(query);
        res.status(200).send(data);

    } catch (err) {
        end(res, `error at get at /info , err : ${err.message}`, 500);
    }


})


app.use("/", async (req, res) => {
    res.status(404).send("that source does'nt exists");
})


app.listen(Port, () => {
    console.log(`server is listening at Port ${Port}`);
})


