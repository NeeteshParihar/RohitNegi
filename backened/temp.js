

import mongoose from "mongoose";
import url from "./connectionString.js"
const { Schema, model } = mongoose;



async function oper() {

    try {

        const database = "Instagram";
        const targetUrl = `${url}${database}`;
        await mongoose.connect(targetUrl);

        // shcme create 

        const Post = new Schema({

            name: String,
            userName: String,
            likes: Number,
            comment: Number,
            views: Number
        })



        const instaPost = model('intaPost', Post);

        //     const mypost1 = new instaPost({name : "Neetesh" , userName :"neetesh653" , likes : 1000});

        //    const res = await mypost1.save() ;
        // console.log(res) ;

        // const res = await instaPost.insertOne({
        //     name : "sandhya" , userName : 1333 , 
        // });

        // console.log(res);

        const res = await instaPost.create({name : null}, {name : undefined} , {name : null})

        // console.log(res);

        // const res = await instaPost.find({likes : 1000}) ;
        console.log(res);



    } catch (err) {
        console.log(err);
    }

}

oper();