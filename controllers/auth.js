const {response} = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req,res)=>{

    const {email, password} = req.body;

    try {
        //Verify Email
        const userDB = await User.findOne({email});
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'Email not valid'
            })
        }
        //Verify PWD
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password not valid'
            })
        }

        //Generate Token
        const token = await generateJWT(userDB.id);

        res.json({
            ok:true,
            msg:'Hello from Auth',
            res: token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Report administrator"
        })
    }
}

const googleSignIn = async (req,res=response)=>{

    try {
        const {email, name, picture} = await googleVerify(req.body.token);
        const userDB = await User.findOne({email})
        let user;
        if(!userDB){
            user = new User({
                name,
                email,
                password:'@@@',
                img: picture,
                google:true
            })
        }else{
            user = userDB;
            user.google = true;
        }

        //Save User
        await user.save();
        //Generate Token
        const token = await generateJWT(user.id);

        
        res.json({
            ok:true,
            email,
            name,
            picture,
            token
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Google token is not correct"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}