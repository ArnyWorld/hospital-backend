const {response} = require("express");
const Doctor = require("../models/doctor");

const getDoctors = async (req, res)=>{
    try {
        const doctor = await Doctor.find().populate('user', 'name').populate('hospital', 'name img');

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

const getDoctor = async (req, res=response)=>{
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).populate('user', 'name').populate('hospital', 'name img');

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

const putDoctor = async(req, res=response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const doctor = await Doctor.findById(id);
        if(!doctor){
            return res.json({
                ok:true,
                msg:'Doctor Id not found'
            }) 
        }
        const changeDoctor = {
            ...req.body,
            user: uid,
        }
        doctorUpdate = await Doctor.findByIdAndUpdate(id, changeDoctor, {new:true})
        res.json({
            ok:true,
            id,
            doctorUpdate
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error, Talk to the administrator'
        })
    }

}

const deleteDoctor = async (req, res=response)=>{
   
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id);
        if(!doctor){
            return res.json({
                ok:true,
                msg:'Doctor Id not found'
            }) 
        }
      await Doctor.findByIdAndDelete(id);
        res.json({
            ok:true,
            id,
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
    getDoctors,
    getDoctor,
    postDoctor,
    putDoctor,
    deleteDoctor
}