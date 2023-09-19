require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors=require("cors");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

const port =8005;
require("./db/conn");
const Products= require("./models/ProductsSchema");

const DefaultData = require("./defaultdata");
app.use(express.json());    
app.use(cookieParser(""));
app.use(cors()); 
app.use(router);


app.listen(port,()=>{
    console.log(`server listening on port ${port}`);


});

DefaultData();