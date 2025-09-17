const express = require("express")
const jwt = require("jsonwebtoken")

const verifyJWT = (req,res=express.response,next)=>{
    const token = req.header("x-token")
    const secretJWT = process.env.JWT_SECRET_SEED

    if (!token){
        return res.status(400).json({
            ok:false,
            error:"No hay token"
        })
    }

    try{

        const payload = jwt.verify(token,secretJWT)
        req.user = payload

    }catch(error){
        console.log(error)
        return res.status(401).json({
            ok:false,
            errors:"El token no es válido"
        })
    }

    next()
}

module.exports={
    verifyJWT
}