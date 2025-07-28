import express from "express";
import JWT from 'jsonwebtoken';
import users from '../models/users.js';
import redisclient from "../comp/redis.js";
import auth from "../comp/auth.js";
import getUser from "../comp/getUser.js";
import getHashcode from "../comp/generateHashCode.js";
import verifyUserPassword from "../comp/verifyPassword.js";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const tokenExpiryTime = Number.parseInt(process.env.tokenExpiryTime);

const authRouter = express.Router();

// login api , signup api , logout auth protected api 


authRouter.post('/login', getUser, async(req, res) => {

    try {

        const {password , emailId} = req.body;
        const existingUser = req.existingUser;

        if(existingUser && await verifyUserPassword(password, existingUser.password)){

            const accessToken = JWT.sign({emailId}, PRIVATE_KEY, {expiresIn:tokenExpiryTime});
            res.cookie('accessToken', accessToken, { 
                expires: new Date() + tokenExpiryTime ,  // browset will not keep this cookie after the expirationTime 
                httpOnly: true
            })

            res.status(200).json({
                success: true,
                message: 'login successFully!' 
            })

        }else if(existingUser){

            res.status(401).json({
                success: false,
                err: "invalid credentials"
            })

        }else{

            res.status(404).json({
                success: false,
                err: "user does'nt exist"
            })

        }


    } catch (err) {

        res.status(500).json({
            success: false,
            err: err.message
        })

    }
})

authRouter.post('/signup', getUser, async(req, res) => {
   
    try {

        const { userName, emailId, password } = req.body;
        const existingUser = req.existingUser;

        if (existingUser) {
            // conflict : 409 
            res.status(409).json({
                success: false,
                err: "user exist, Please login"
            })


        } else {

            const newUser = await users.create({
                userName,
                emailId,
                password: await getHashcode(password)
            })

            const accessToken = JWT.sign({ emailId }, PRIVATE_KEY, { expiresIn: tokenExpiryTime });

            res.cookie("accessToken", null, {
                httpOnly: true, // this avoids scripts to access the accessToken 
                expires: new Date() + tokenExpiryTime // expire it from now after 'tokenExpirytime' seconds 
            });

            res.status(201).json({
                success: true,
                message: "user signed-up successfully"
            })
        }


    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
})

authRouter.post('/logout', auth , async(req, res) => {

    try {
        
        const {accessToken} = req.cookies;
        const payload = JWT.decode(accessToken);

        const expireAtTime = payload.exp;
        const emaildId = payload.emailId;

        await redisclient.set(`logout:user:${emaildId}`,accessToken );
        await redisclient.expireAt(`logout:user:${emaildId}`, expireAtTime );

        // only clear after we have added it in the redis 
        res.cookie('accessToken',null , { expires: new Date() , httpOnly: true } ); // the expires take the date at which the cookie will became invalid

        res.status(200).json({
            success: true,
            message: 'logout successFully' 
        })

    } catch (err) {

         res.status(500).json({
            success: false,
            message: 'logout falied!',
            err: err.message
        })

    }

})



export default authRouter;
