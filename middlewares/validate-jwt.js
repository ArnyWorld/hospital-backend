const jwt = require("jsonwebtoken");

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

module.exports = {validateJWT}