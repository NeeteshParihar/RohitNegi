import Redis from "ioredis";
import express from "express";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../Model/users.js";
import dotenv from "dotenv"; // this module will helps us to load the environment variable from .env file into memory 
// to access these env variables we need process.env object 

dotenv.config({ path: './temp.env' }); // critical ye jis folder mai se run ho raha hai, uske relative path hota hai 
dotenv.config({path: './redis.env'}); // dono file se load kardega environment variables 


// each environment variables are added as the strings , so if you expect other types , do-not forget to typecast the values 

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const tokenExpiryTime =   Number.parseInt(process.env.tokenExpiryTime);

// console.log(process.env.database);
// console.log(process.env['redis-host']);

const authenticateRouter = express.Router();

// login , signup, logout  ,
// login --> 1.emailId, 2. password : check the existing user , check the password and send accesstokens 
// signup --> 1.emailId 2.password, 3. userName : check the existing user 




const redis = new Redis({

    password: process.env["redis-password"],
    username: process.env["redis-useName"],
    host: process.env["redis-host"],
    port: process.env["redis-port"],

}); // make and connect the client to the redis server 

redis.on("error", (err)=>{
    console.log("redis err", err);
})

redis.on("connect", ()=>{
    console.log("connected to redis");
})

async function getUser(req, res, next) {

    try {

        const { emailId } = req.body;
        const existingUser = await Users.findOne({ emailId }).exec(); // its can we null or a document
        req.existingUser = existingUser;
        next();

    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }

}

async function checkAuth(req, res){

    try{

        const {accessToken} = req.cookies;
        console.log(accessToken);


        const payload = JWT.verify(accessToken, PRIVATE_KEY);
        // if accessToken are valid then check the redis database if we have added this token as blocked
        const emailId = payload.emailId;

        const blockedAccesstoken = await redis.get(`logout:accessToken:user:${emailId}`);

        if(blockedAccesstoken){ // user is trying to access the account after logout 
            return res.status(401).json({
                success: true,
                message: "un-authenticated"
            })
        }


        // else the banda is authenticted 
        res.status(200).json({
            success: true,
            message: "authenticated"
        })


    }catch(err){

         res.status(401).json({
            success: false,
            message: err.message
        })

    }

}

async function getHashcode(password, n = 10) {
    const hashCode = await bcrypt.hash(password, n);
    return hashCode;
}

async function checkUserPassword(password, hashCode){
    return await bcrypt.compare( password, hashCode);
}


authenticateRouter.post("/check-auth", checkAuth);

authenticateRouter.post("/login", getUser, async(req, res) => {

    try{
        const {emailId, password} = req.body;
        const existingUser = req.existingUser;

        console.log(existingUser);

        if(existingUser && await checkUserPassword(password , existingUser.password )  ){

            console.log(typeof tokenExpiryTime);

            const accessToken = JWT.sign({emailId}, PRIVATE_KEY, {expiresIn: tokenExpiryTime}); // agar accesstoken expire ho jaye then , browser will not erase it 
            // because we did'nt mentioned the expire time while sending the cookie

            console.log("logging");
             res.cookie("accessToken", accessToken, {
                httpOnly: true, // this avoids scripts to access the accessToken,
                expires: new Date( Date.now() + 24*60*60*1000 ) // we have to pass the date // adding the expires will autmoticcally force browser to clear the cookie 
            });
            

            res.status(200).json({
                success: true,
                message: "login successfully"
            })
            

        }else if( existingUser){
             res.status(401).json({
                success: false,
                err: "invalid credentials"
            })
        }else{

             res.status(400).json({
                success: false,
                err: "No user found,Please signup!"
            })

        }


    }catch(err){
        res.status(500).json({
            success: false,
            err: err.message
        })
    }

})

authenticateRouter.post("/signup", getUser, async (req, res) => {

    try {

        const { userName, emailId, password } = req.body;
        const existingUser = req.existingUser;

        if (existingUser) {

            res.status(409).json({
                success: false,
                err: "user exist, Please login"
            })


        } else {

            const newUser = await Users.create({
                userName,
                emailId,
                password: await getHashcode(password)
            })

            const accessToken = JWT.sign({ emailId }, PRIVATE_KEY, { expiresIn: tokenExpiryTime });

            res.cookie("accessToken", null, {
                httpOnly: true // this avoids scripts to access the accessToken 
            });

            res.status(201).json({
                success: true,
                message: "user registered successfully"
            })
        }


    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }

})

authenticateRouter.post("/logout", async(req, res) => {
    try {

       const {accessToken} = req.cookies;

       if(!accessToken) {

        res.status(400).json({
            success: false,
            err : "login first"
        })

        // the iat token is very important as iat ki bajah se hi ek user ke liye diff-diff token generate ho paaate hai 

       }else{

        // res.clearCookie("accessToken", {
        //     httpOnly: true
        // })

        // res.cookie( "accessToken", "invalid" , {
        //     httpOnly: true
        // } ); // invalid JWT token 


        const payload = JWT.verify(accessToken, PRIVATE_KEY); // check if it has already-exipired: it will throw an error automatically 

        // console.log(payload);
        const emailId = payload.emailId; // we can also use JWT.decode(accessToken) in Order to get these three info 
        // const expiryDate = payload.exp; // the iat is issuedAt and exp is the expiry these are seconds from 1970 

        // console.log(new Date( Number.parseInt(expiryDate) *1000)  ); // the javascript treats numbers as milliseconds elapsed from 1970 

        // if the token if not expired it means the user is already logined so we have to add this in redis and clear the cookie 

       await redis.set(`logout:accessToken:user:${emailId}`, accessToken);
       await redis.expireat(`logout:accessToken:user:${emailId}`, payload.exp); // it will now delete it at perfect time 
        

       // this expiracy is ttl means time to live in seconds from current time 
        // redis.set( `logout:accessToken:user:${emailId}`, accessToken , "ex", tokenExpiryTime ); // the redis will clear this after 60 seconds as the max-age of the accesstoken is 60seconds

        res.cookie("accessToken", null , { expires: new Date() }  ); // after the time , the browser will erase this cookies authomatically 

        res.status(200).json({
            success: true,
            message: "logout successfully"
        });

       }

    } catch (err) {

        res.status(500).json({
            success: false,
            err:  err.message
        })

    }
})

export default authenticateRouter;

