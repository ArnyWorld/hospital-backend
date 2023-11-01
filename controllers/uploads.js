const path = require("path");
const fs = require("fs");
const {response} = require("express");
const {v4:uuidv4} = require("uuid");
const { updateImage } = require("../helpers/updateImage");
const fileUpload = (req, res=response)=>{   

    const type = req.params.type;
    const id = req.params.id;
    const validTypes = ['hospitals', 'doctors', 'users'];
    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok:false,
            msg:'He is not a /doctors, /hospitals or /users'
        })
    }
    //Validate file exists
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No files were uploaded.'
        })
      }

      //process image
      const file = req.files.image;
      const cutName = file.name.split('.');
      const fileExtension = cutName[cutName.length - 1];
      
      //validate extension
      const validExtensions = ['png','jpg','jpeg','gif'];
      if(!validExtensions.includes(fileExtension)){
        return res.status(400).json({
            ok:false,
            msg: 'It is not a permitted extension.'
        })
      }

      //Generate name file
      const fileName = `${uuidv4()}.${fileExtension}`;

      //Path - save file
      const path = `./uploads/${type}/${fileName}`;
 
      //Move Image
    file.mv(path, (err)=> {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:'error when moving image'
            });
        }
        //Update Image DB
        updateImage(type, id, fileName);

        res.json({
            ok:true,
            msg:'File Upload',
            fileName
        })
    });
   
}

const getImage = (req, res)=>{
    const type = req.params.type;
    const picture = req.params.picture;

    const pathImg = path.join(__dirname, `../uploads/${type}/${picture}`);
    //Verify iamge exists
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/notImage.jpeg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    getImage
}