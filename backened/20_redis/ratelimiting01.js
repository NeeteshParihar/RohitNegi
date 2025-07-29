
import express from "express";
import Redis from "ioredis";
import dotenv from 'dotenv';

// implementing the rate-limiter using fixed-windows suze

dotenv.config({ path: './redis.env' });

const redisclient = new Redis({
    password: process.env["redis-password"],
    username: process.env["redis-useName"],
    host: process.env["redis-host"],
    port: process.env["redis-port"],
});

redisclient.on("error", (err) => {
    console.log("redis err", err);
})

redisclient.on("connect", () => {
    console.log("connected to redis");
})


const port = 5008;
const app = express();

const RATE_LIMIT = 10; // 10 request in aparticular window
const RATE_LIMITER_WINDOW = 60; // 10 request in 60 seconds 

async function rateLimiter(req, res, next) {

    try {

        const ip = req.ip; // get the ip address of the user 
        const key = `rateLimited:${ip}`;

        const currentRequests = await redisclient.incr(key); // if not have a wind , it make with coutner 1

        console.log(typeof currentRequests);

        if (currentRequests == 1) {
            await redisclient.expire(key, RATE_LIMITER_WINDOW); // expire sets the ttl while expiresAt sets dateobj 
        }

        const ttl = await redisclient.ttl(key);

        // headers includes information about the response or request , it take key-value pairs we can set key anything we can set ourName , but we should use a format 
        res.setHeader('X-RateLimit-Limit', RATE_LIMIT);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT - currentRequests));
        res.setHeader('X-RateLimit-Reset', new Date(Date.now() + ttl * 1000).toISOString()); // it tell remaining seconds from now 


        if (currentRequests > RATE_LIMIT) {
            return res.status(429).json({
                success: false,
                message: `to many request in short period! from ip: ${ip} `
            })
        }

        next(); // forward the request to the request handlers 

    } catch (err) {

        res.status(500).json({
            success: false,
            err: err.message
        })

    }
}

app.use(rateLimiter);

// dummy route 
app.use('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "operation done"
    })
})

app.listen(port, () => {
    console.log(`server is running at port : ${port}`);
})