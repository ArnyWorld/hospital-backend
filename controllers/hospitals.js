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

const putHospital = async (req, res)=>{
    const hospitalId = req.params.id;
    const uid = req.uid;
    try {
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            res.status(404).json({
                ok:true,
                msg: 'Hospital not found'
            })    
        }
        //hospital.name = req.body.name;
        const changeHospital = {
            ...req.body,
            user:uid
        }
        const hospitalUpdated = await Hospital.findByIdAndUpdate(hospitalId, changeHospital, {new: true});

        res.json({
            ok:true,
            msg:'update Hospital',
            hospitalUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error, Talk to the administrator'
        })
    }
}

const deleteHospital = async (req, res)=>{
    const hospitalId = req.params.id;
    try {
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            res.status(404).json({
                ok:true,
                msg: 'Hospital not found'
            })    
        }
        await Hospital.findByIdAndDelete(hospitalId);

        res.json({
            ok:true,
            msg:'deleted Hospital',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error, Talk to the administrator'
        })
    }
}

module.exports = {
    getHospitals,
    postHospital,
    putHospital,
    deleteHospital
}