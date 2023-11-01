const {response} = require("express");
const Hospital = require("../models/hospital");

const getHospitals = async (req, res)=>{
    try {
        const hospital = await Hospital.find().populate('user', 'name email');

        res.json({
            ok:true,
            hospital
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error, Talk to the administrator'
        })
    }
}

const postHospital = async (req, res = response)=>{
    
    const uid = req.uid;
    const hospital = new Hospital({user: uid, ...req.body});
    try {
        
        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital:hospitalDB
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error, Talk to the administrator'
        })
    }

}

const putHospital = (req, res)=>{
    res.json({
        ok:true,
        msg:'putHospitals'
    })
}

const deleteHospital = (req, res)=>{
    res.json({
        ok:true,
        msg:'deleteHospitals'
    })
}

module.exports = {
    getHospitals,
    postHospital,
    putHospital,
    deleteHospital
}