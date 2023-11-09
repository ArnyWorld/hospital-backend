const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = (req, res, next)=>{
    //Read Headers
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'There is no token in the validation.'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        console.log(uid);
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token invalid'
        })
    }
}

const validateAdminRole = async (req, res, next)=>{
    const uid = req.uid;
    try {
        const userDB = await User.findById(uid);
        console.log("user: ", userDB);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "user not found"
            })
        }
        if(userDB.role!== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg: 'Not authorized'
            })
        }
        next();        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Talk to the administrator'
        })
    }
}

const validateAdminRoleOrSameUser = async (req, res, next)=>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const userDB = await User.findById(uid);
        console.log("user: ", userDB);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "user not found"
            })
        }
        if(userDB.role=== 'ADMIN_ROLE' || uid === id){
            next();        
        }else{
            return res.status(403).json({
                ok:false,
                msg: 'Not authorized'
            })

        }
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Talk to the administrator'
        })
    }
}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRoleOrSameUser
}