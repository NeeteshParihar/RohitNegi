
import JWT from 'jsonwebtoken';
import redisclient from './redis.js';
import dotenv from 'dotenv';

dotenv.config({ path: './temp.env' });

const PRIVATE_KEY = process.env.PRIVATE_KEY; // wee have already loaded the env-variable in the index file then we do not need to again config them here for loading 

// this will only authorise the
async function auth(req, res, next){

    try{

        const {accessToken} = req.cookies;
        const payload = JWT.verify(accessToken, PRIVATE_KEY);
        
        // if we are here it  means the accessToken is valid , so now check if the we have added a accessToken for this user as blocked 
        const emailId = payload.emailId;
        const blockedToken = await redisclient.get(`logout:user:${emailId}`);

        // user is trying to access account  after logout 
        if(blockedToken){
           return  res.status(400).json({
                success: false,
                err: "Please login first!"
            })
        }

        // if accessToken is valid and along with this , the user is logged in the we can allow the access

        next();


    }catch(err){

        res.status(500).json({
            success: false,
            err: err.message
        })

    }

}

export default auth;