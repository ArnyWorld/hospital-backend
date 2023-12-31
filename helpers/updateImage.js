const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital"); 
const fs = require("fs");

const deleteImage = (path)=> {
    if(fs.existsSync(path)){
        //delete old image
        fs.unlinkSync(path);
    }
}

const updateImage = async(type, id, fileName)=>{
    let oldPath = '';
    switch (type) {
        case 'doctors':
            const doctor =await Doctor.findById(id);
            if(!doctor){
                return false;
            }
            oldPath = `./upload/doctors/${doctor.img}`;
            deleteImage(oldPath);
            doctor.img = fileName;
            await doctor.save();
            return true;
        case 'hospitals':
            const hospital =await Hospital.findById(id);
            if(!hospital){
                return false;
            }
            oldPath = `./upload/hospitals/${hospital.img}`;
            deleteImage(oldPath);
            hospital.img = fileName;
            await hospital.save();
            return true;
            break;
        case 'users':
            const user =await User.findById(id);
            if(!user){
                return false;
            }
            oldPath = `./upload/users/${user.img}`;
            deleteImage(oldPath);
            user.img = fileName;
            await user.save();
            return true;
            break;
        default:
            break;
    }
}

module.exports = {
    updateImage
}