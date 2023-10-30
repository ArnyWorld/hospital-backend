const {Router} = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fileds");
const router = Router();

router.post('/', [
    check('email', 'Email is required and unique').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],
    login
)


module.exports = router;