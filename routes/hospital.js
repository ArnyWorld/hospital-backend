const {Router} = require("express");
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validate-fileds");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getHospitals, putHospital, deleteHospital, postHospital } = require("../controllers/hospitals");
const router = Router();

router.get("/", validateJWT,getHospitals );
router.post("/", [
                    validateJWT,
                    check('name', 'name is required').not().isEmpty(),
                    validateFields
                 ],
                 postHospital );

router.put("/:id", 
                [
                  validateJWT,
                  check('name', 'name is required').not().isEmpty(),
                  validateFields
                ]
                ,putHospital);

router.delete("/:id", validateJWT, deleteHospital);

module.exports = router;