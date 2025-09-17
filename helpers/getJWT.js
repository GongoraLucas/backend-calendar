const jwt = require("jsonwebtoken")

const getJWT = (uid,name)=>{
    const payload={uid:uid,name:name}
    const  secret=process.env.JWT_SECRET_SEED

    return new Promise((resolve,reject)=>{
        jwt.sign(payload,secret,{
            expiresIn:"2h"
        },(error,token)=>{
            if(error){
                reject(error)
            }else{

                resolve(token)
            }
        })
    })
    
}

module.exports={
    getJWT
}