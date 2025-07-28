import express from "express";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../models/user.js";
import dotenv from "dotenv";


dotenv.config({path:'../.env'});

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const tokenExpiryTime = process.env.tokenExpiryTime;



const authenticateRouter = express.Router();

async function getUser(req, res, next){
    try{

        console.log("world");

        const {emailId} = req.body;
        const user = emailId &&  await Users.findOne({emailId}); // if  user not  exist the value is null 
        req.user = user;
        next();

    }catch(err){

        console.log("err in middleware in auth route");
        res.status(500).send({
            success: false,
            err: err.message
        })

    }
}

async function checkPassword(password, hashCode){
    return await bcrypt.compare(password, hashCode);
}

async function getHashcode(password, n = 10){
    return await bcrypt.hash(password, n);
}



authenticateRouter.use(getUser);

authenticateRouter.post('/login', async(req, res)=>{

    try{

        const {emailId, password} = req.body;
        const user = req.user;

        if(user && await checkPassword(password, user.password)){

            const accessToken = JWT.sign({emailId}, PRIVATE_KEY, {expiresIn:'2d'});

            res.cookie("accessToken", accessToken);
             res.status(200).send({
                message: "login successfully"
            });

        }else if(user){
            res.status(401).send({
                message: "invalid credentials"
            });
        }else{
            res.status(404).send({
                message: "user not exist"
            });
        }


    }catch(err){
        console.log("err in login route");

         res.status(500).send({
                message: err.message
            });
    }
        
})


authenticateRouter.post('/signup', async(req, res)=>{

    try{

        const {userName, emailId, password} = req.body;
        const user = req.user;

        if(user){

            res.status(409).send({
                message: "user exists!, Please login"
            })

        }else{

            const newUser = await Users.create({
                userName, emailId, 
                password: await getHashcode(password)
            })

            const accessToken = JWT.sign({emailId}, PRIVATE_KEY, {expiresIn:'2d'});

            res.cookie("accessToken", accessToken);
             res.status(200).send({
                message: "signup successfully"
            });

        }


    }catch(err){
        console.log("err in signup route");

         res.status(500).send({
                message: "internal err"
            });
    }
        
})

authenticateRouter.post('/logout', (req, res, next) => {

  res.clearCookie("accessToken", {
    httpOnly: true,   
  });

  res.status(200).send({ message: "Logged out successfully" });
});


export default authenticateRouter;