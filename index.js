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
app.use('/api/hospitals', require('./routes/hospital.js'))
app.use('/api/search', require('./routes/search.js'))
app.use('/api/doctors', require('./routes/doctor.js'))
app.use('/api/login', require('./routes/auth.js'))
app.use('/api/upload', require('./routes/upload.js'))

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

