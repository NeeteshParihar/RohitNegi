
import mongoose from "mongoose";
import express from "express";
import url from "../connectionString.js" ;
import Users from "./models/Users.js"

const PORT = 5008;

export {mongoose , express , url , PORT , Users };

