
import express from "express";

const PORT = 5008;
const app = express();
app.use(express.json());




export {PORT , app};  // import as {PORT , app } otherwise it want work