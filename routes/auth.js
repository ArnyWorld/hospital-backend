const {Router} = require("express");
const { login, googleSignIn, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fileds");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.post('/', [
        check('email', 'Email is required and unique').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
)

router.post('/google', [
    check('token', 'Google Token is required').not().isEmpty(),
    validateFields
],
googleSignIn
)

router.get('/renew', 
    validateJWT
,
renewToken
)

module.exports = router;