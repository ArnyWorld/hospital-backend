
const User = require("../models/user");
const {response} = require("express");
const bcrypt= require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req,res)=>{
    const desde = Number(req.query.desde) || 0;
    console.log(desde);
    // const user = await User.find({}, 'name email role goggle').skip(desde).limit(5);
    // const total = await User.count();
    const [user, total] = await Promise.all([
        User.find({}, 'name email role img google').skip(desde).limit(5),
        User.countDocuments()
    ]);
    res.status(200).json({
        ok:true,
        msg:"get Users",
        user,
        uid:req.uid,
        total
    })    
}

const postUsers = async (req,res=response)=>{

    const {email, password} = req.body;
  
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok:false,
    //         errors: errors.mapped()
    //     })
    // }
    try {
        const emailExists =await User.findOne({email})
        if(emailExists){
            return res.status(400).json({
                ok:false,
                msg:"the email already exists"
            });
        }
        const user = new User(req.body);
        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate Token
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok:true,
            msg:'User Created',
            user,
            token
        })    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Error, check logs"
        })
    }
    
}

const putUser = async (req, res)=>{
    const uid = req.params.id;
    try {
        //Validate token


        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'user not found'
            })
        }
        const {passwword, google, email, ...fields} = req.body;

        if(userDB.email !== email){
            const emailExists = await User.findOne({email})
            if(emailExists){
                return res.status(400).json({
                    ok:false,
                    msg:'Email Exists'
                })
            }
        }
        fields.email = email;
        //Update
        const userUpdate = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok:true,
            user: userUpdate
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Error, check logs"
        })
    }
}

const deleteUser = async (req, res)=>{
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'user not found'
            })
        }
        const userDelete = await User.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'user Deleted',
            user: userDelete
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Error, check logs"
        })
    }
}

module.exports = {
    getUsers,
    postUsers,
    putUser,
    deleteUser
}