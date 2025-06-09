import mongoose from "mongoose";
const { Schema, model } = mongoose;



const reels = new Schema({
    length: Number,
    likes: Number,
    commnets: String,
    views: Number,
})

const Post = new Schema({

    name: String,
    userName: String,
    likes: Number,
    comment: Number,
    views: Number
})



const instaPost = model('intaPost', Post);

const instgramReels = model('reels', reels);

export { instaPost , instgramReels, mongoose };

