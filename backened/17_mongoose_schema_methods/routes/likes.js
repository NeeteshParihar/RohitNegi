
import express from "express";

const likesRouter = express.Router();

// get the total likes 
likesRouter.get('/', (req, res)=>{
    try{
        res.send( 200 );
    }catch(err){
        res.send(err.message);
    }
})

// add the like
likesRouter.post('/add', (req, res)=>{
     try{
        // <-------  add logic 
        res.send( `like added` );
    }catch(err){
        res.send(err.message);
    }
})

likesRouter.delete('/minus', (req, res)=>{
     try{
        // <-------  mis logic logic 
        res.send( `like backoff` );
    }catch(err){
        res.send(err.message);
    }
})

export default likesRouter;