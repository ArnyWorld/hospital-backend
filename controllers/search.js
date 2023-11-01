const {response} = require("express");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const getResult = async (req,res=response)=>{
    const search = req.params.keyword;
    const regex = new RegExp(search, 'i')

    // const users = await User.find({name:regex})
    // const doctors = await Doctor.find({name:regex})
    // const hospitals = await Hospital.find({name:regex})

    const [users, doctors, hospitals] = await Promise.all([
        User.find({name:regex}),
        Doctor.find({name:regex}),
        Hospital.find({name:regex})
    ])

    
    res.status(200).json({
        ok:true,
        search,
        users,
        doctors,
        hospitals
    })
}

const getDocumentsCollection = async (req,res=response)=>{
    const search = req.params.keyword;
    const regex = new RegExp(search, 'i');
    const table = req.params.table;
    let data = [];
    switch (table) {
        case 'doctors':
                data = await Doctor.find({name:regex}).populate('user','name img').populate('hospital', 'name img');
            break;
            case 'hospitals':
                data = await Hospital.find({name:regex}).populate('user','name img') ;
                break;
            case 'users':
                data = await User.find({name:regex}).populate('user','name img');
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg:"the table has to be /doctors, /hospitals or /users"
            })      
    }
    res.json({
        ok:true,
        res:data
    })
}

module.exports = {
    getResult,
    getDocumentsCollection
}