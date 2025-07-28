
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config({path: './redis.env'});

const redisclient = createClient({
    username: process.env['redis-username'],
    password: process.env['redis-password'],
    socket: {
        host: process.env['redis-host'],
        port: process.env['redis-port']
    }
})


export default redisclient;
