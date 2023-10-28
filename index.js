const express = require("express");
require('dotenv').config();
const {dbConnection} = require("./database/config.js");
const cors = require("cors");

const app = express();
app.use(cors());
dbConnection();
console.log(process.env.PORT)

//Routes
app.get("/",(req,res)=>{
    res.status(200).json({
        ok:true,
        msg:"Hello World"
    })    
})
app.listen(process.env.PORT,()=>{
    console.log("Server running...")
})

