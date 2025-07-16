

import mongoose from "mongoose";
import url from "./connectionString.js";
const { Schema, model, SchemaTypes } = mongoose;


const databaseUrl = `${url}${'Blogging'}`;


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },
    content: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
    comments: [{

        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        content: String,
        votes: Number
    }
    ]
});

const Blog = model("Blog", blogSchema);

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        minLength: 10,
        required: true,
        lowecase: true,
        trim: true
    }
})

blogSchema.pre("save", function (next) {
    this.updated = Date.now();
    console.log("it called");
    next();

})

const User = model("User", userSchema); 

mongoose.connect(databaseUrl);


console.log("creating");
const user = await User.create({
    name: 'Neetesh Parihar',
    email: "neeteshparihar22@gmail.com"
});

const article = await Blog.create({
    title: 'Awesome Post!',
    slug: 'Awesome-Post',
    author: user._id,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
    comments: [
        {
            user: user._id
        }
    ]
});

// console.log(article);

// console.log(user);


const ans = await Blog.findOne({ "_id": "685558f0602a5e47fc728c12" }).populate("comments.user");
console.log(ans.comments[0]);
