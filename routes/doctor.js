const {Router} = require("express");
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validate-fileds");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getDoctors, putDoctor, deleteDoctor, postDoctor } = require("../controllers/doctors");
const router = Router();

router.get("/",validateJWT,getDoctors );
router.post("/", [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('hospital', 'id hospital is required and valid').isMongoId(),
        validateFields
    ],
     postDoctor );

router.put("/:id", 
                [
                ]
                ,putDoctor);

router.delete("/:id", [], deleteDoctor);

module.exports = router;