const express = require("express");
require('dotenv').config();
const {dbConnection} = require("./database/config.js");
const cors = require("cors");

const app = express();
app.use(cors());
//Read and parse body
app.use(express.json());

dbConnection();
console.log(process.env.PORT)

app.use('/api/users', require('./routes/users.js'))
app.use('/api/login', require('./routes/auth.js'))

//Routes
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         ok:true,
//         users:[{
//             id:123,
//             name:"Arni"
//         }]
//     })    
// })
app.listen(process.env.PORT,()=>{
    console.log("Server running...")
})

