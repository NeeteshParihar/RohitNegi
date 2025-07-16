
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    name: String,
    userName: String,
    likes: Number,
    comment: Number,
    views: Number
    
});



const instaposts = mongoose.model('instaposts' ,  postSchema ) ;

export default instaposts ;