
import express from "express";

const commentRouter = express.Router();

// get the total likes 
commentRouter.get('/', (req, res)=>{
    try{
        res.send( ["list of comments in the post"] );
    }catch(err){
        res.send(err.message);
    }
})

// add the comment
commentRouter.post('/add', (req, res)=>{
     try{
        // <-------  add logic 
        res.send( `comment added added` );
    }catch(err){
        res.send(err.message);
    }
})

// delete the comment
commentRouter.delete('/delete', (req, res)=>{
     try{
        // <-------  mis logic logic 
        res.send( `comment deleted` );
    }catch(err){
        res.send(err.message);
    }
})

// edit the comment
commentRouter.patch('/edit', (req, res)=>{
     try{
        // <-------  mis logic logic 
        res.send( `comment edited` );
    }catch(err){
        res.send(err.message);
    }
})

export default commentRouter;