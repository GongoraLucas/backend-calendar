const express = require("express");
const { check } = require("express-validator");
const { login, register, refreshToken } = require("../controllers/auth");
const { verifyErrors } = require("../middlewares/fieldsValidator");
const { verifyJWT } = require("../middlewares/JWTValidator");
const router = express.Router();

router.post(
    "/", 
    [
        check("email","El email es obligatorio y debe ser email").isEmail(),
        check("password","El password es obligatorio y debe ser minimo de 6 carácteres").isLength({min:6}),
        verifyErrors
    ], 
    login
);

router.post(
    "/new",
     [
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("email","El email es obligatorio y debe ser email").isEmail(),
        check("password","El password es obligatorio y debe ser minimo de 6 carácteres").isLength({min:6}),
        verifyErrors
     ], 
     register
    );

router.get("/renew",[verifyJWT], refreshToken);

module.exports = router;
