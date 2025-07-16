
import express from "express";

const app = express();
const PORT = 5008;


app.use(express.json()) ;


app.listen(PORT , ()=>{
    console.log(`server listening at port ${PORT}`);
})


export default app ;