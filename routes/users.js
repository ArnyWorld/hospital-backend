const {Router} = require("express");
const {check} = require("express-validator");
const {getUsers, postUsers, putUser, deleteUser} = require("../controllers/users");
const {validateFields} = require("../middlewares/validate-fileds");
const { validateJWT, validateAdminRole, validateAdminRoleOrSameUser } = require("../middlewares/validate-jwt");
const router = Router();

router.get("/", validateJWT,getUsers );
router.post("/", [
                    check('name', 'Name is required').not().isEmpty(),
                    check('password', 'Password is required').not().isEmpty(),
                    check('email', 'Email is required and unique').isEmail(),
                    validateFields
                 ],
                 postUsers );

router.put("/:id", 
                [
                    validateJWT,
                    validateAdminRoleOrSameUser,
                    check('name', 'Name is required').not().isEmpty(),
                    check('role', 'Role is required').not().isEmpty(),
                    check('email', 'Email is required and unique').isEmail(),
                ]
                ,putUser);

router.delete("/:id", [validateJWT, validateAdminRole], deleteUser);

module.exports = router;