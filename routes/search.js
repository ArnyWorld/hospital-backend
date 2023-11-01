const {Router} = require("express");
const { getResult, getDocumentsCollection } = require("../controllers/search");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:keyword", validateJWT, getResult)
router.get("/collection/:table/:keyword", validateJWT, getDocumentsCollection)

module.exports = router;