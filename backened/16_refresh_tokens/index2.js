
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const privateKey = "server-private-key";
const expirytime = 20; // valid for 20 secs 

const app = express();
const port = 5008;

app.use(express.json());
app.use(cookieParser());


function auth(req, res, next){
    try{    

        const {cookies} = req;
        const {accessToken} = cookies;

        // <------ validate the access token ----->

        console.log("verifying...");
        const payload = jwt.verify(accessToken, privateKey);       
        console.log("verified"); 

        next() ; // access token is valid
                
    }catch(err){

        res.status(401).json({
            success: false,
            message: "login session expire , please login"
        })


    }
}


app.post("/login",  (req, res) => {

    try {

        const { userName, emailId } = req.body;

        // <---------- generating access token ---------->
        const payload = { userName, emailId };
        const accessToken = jwt.sign(payload, privateKey, { expiresIn: expirytime });

        res.cookie('accessToken', accessToken);

        res.status(200).json({
            success: true,
            message: "you logged in successfully",
            profile: {
                userName, emailId
            }

        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

})

app.get("/debit", auth , (req, res) => {

    try {   

        // <-------- process debiting ----------->

        res.status(200).json({
            success: true,
            message: "amount debated"
        })

    } catch (err) {
        console.log("err in get /debit" , Date.now());

        res.status(500).json({
            success: false,
            message: "internal server error , debited amount will be send back in 2 hrs"
        })

    }

})

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
})