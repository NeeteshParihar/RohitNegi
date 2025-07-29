
import express from "express";
import Redis from "ioredis";
import dotenv from 'dotenv';

// implementing the rate-limiter using sliding-window 
// concept: create a sorted set which stores the last 60seconds old timStamps fo requests
// the set have expiry of 60seconds(in this case)
// whenever a new request comes in , remove timeStamps older than last 60 seconds 
// add new timestamp
// get timeStamp count of the set 
// if count execeeds limit send 429 code and end response
// else add the request in the set and process the request 

// note after the set-expires , and the new request is made a new set will be created.

// the problem with fixed-window 
// let suppose in first window from 12to1 client hits 40 request at 12:59 
// then after 1 he can again able to hit those 40 requests , ( RATE_LIMIT = 40)
// so this is not good for server 

// so sliding window ensures that the client should only able 
// to hit 40 request in last 60 seconds 


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

// there are two more ways to implement the rateLimitor 
// 1. token-bucket
// 2. leasky-buket
// we have implemented
// 1.fixed-window
// 2. sliding-window

const port = 5008;
const app = express();

const RATE_LIMIT = 10; // 10 request in aparticular window
const WINDOW_SIZE_IN_SECONDS = 60; // 10 request in 60 seconds 

async function rateLimiter(req, res, next) {

    const ip = req.ip;
    const key = `rateLimitor:${ip}`;
    const now = Date.now();
    const windowStart = now - WINDOW_SIZE_IN_SECONDS * 1000; // this is the 60seconds before time 

    try {
        // create a object or transaction which can do operations atomically (all passed or roolback)
        const multi = redisclient.multi();

        // remove the timeStamps older than the last 60 seconds
        // or clearly remove timeStamps which are not in current-window 

        multi.zremrangebyscore(key, '-inf', windowStart);
        multi.zadd(key, now, now); // add the timeStamp in the window 
        multi.zcard(key); // cardenality means number of element in a set 
        multi.expire(key, WINDOW_SIZE_IN_SECONDS);   // Set expiry to prevent memory leaks  or wastage if user stops making requests
        multi.ttl(key);

        const [, , currentRequests, , ttl] = await multi.exec();

        console.log(currentRequests);

        res.setHeader('X-Rate-Limit', RATE_LIMIT);
        res.setHeader('X-Rate-Limit-Remaining', Math.max(0,RATE_LIMIT - currentRequests[1]));

        if (currentRequests[1] > RATE_LIMIT) {

            await redisclient.zrem(key, now.toString());

            return res.status(429).json({
                success: false,
                err: "To many request in short time"
            })
        }

        next();


    } catch (err) {
        console.log('Redis error', err);
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