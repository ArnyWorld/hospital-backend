const {response} = require("express");
const Doctor = require("../models/doctor");

const getDoctors = async (req, res)=>{
    try {
        const doctor = await Doctor.find().populate('user', 'name').populate('hospital', 'name');

        res.json({
            ok:true,
            doctor
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error, Talk to the administrator'
        })
    }
}


const postDoctor = async (req, res=response)=>{
    const uid = req.uid;
    const doctor = new Doctor({user:uid,...req.body});
    
    try {
        const doctorDB = await doctor.save();
        res.json({
            ok:true,
            doctor:doctorDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error, Talk to the administrator'
        })
    }
}

const putDoctor = (req, res=response)=>{
    res.json({
        ok:true,
        msg:'putHospitals'
    })
}

const deleteDoctor = (req, res=response)=>{
    res.json({
        ok:true,
        msg:'deleteHospitals'
    })
}

module.exports = {
    getDoctors,
    postDoctor,
    putDoctor,
    deleteDoctor
}