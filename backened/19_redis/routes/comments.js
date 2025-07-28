
import express from "express";
import auth from "../comp/auth";
const commentRouter = express.Router();

commentRouter.get('/', auth,  async(req, res)=>{
    try {

        res.status(200).json({
            success: true,
            comments: ['Nice pick', 'Enjoy travelling']
        })
        
    } catch (err) {
        
        res.status(200).json({
            success: false,
            err: err.message
        })
    }
} )

commentRouter.post('/add',auth , async( req, res)=>{
     try {

        res.status(200).json({
            success: true,
            message: 'comment addded',
            comment: 'nice place'
        })
        
    } catch (err) {
        
        res.status(200).json({
            success: false,
            err: err.message
        })
    }
})

export default commentRouter;