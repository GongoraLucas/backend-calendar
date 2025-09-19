const {response}= require("express")
const User = require("../models/User")
const { getJWT } = require("../helpers/getJWT")
const { genSalt, hashSync, genSaltSync, compareSync } = require("bcryptjs")


const login = async (req,res=response)=>{
     const {email,password}=req.body
    try{

        let user = await User.findOne({email})

        if (!user){
            return res.status(400).json({
                ok:false,
                errors: {
                    email:`El correo es incorrecto` 
                }
                    
            })
        }
        
        const verifyPassword = compareSync(password,user.password)

        if (!verifyPassword){
              return res.status(400).json({
                ok:false,
                errors: {
                    password: `La contraseña es incorrecta` 
                }
            })

        }

        const token = await getJWT(user.id,user.name)

        res.status(200).json({
            ok:true,
            message:"Ha ingresado exitosamente",
            user:{
                uid:user.id,
                name:user.name
            },
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            errors:{
                server:"Error en el servidor"
            }
        })
    }

}

const register = async (req,res=response)=>{
    const {name,email,password}=req.body
    try{

        let user = await User.findOne({email})

        if (user){
            return res.status(400).json({
                ok:false,
                message: `El usuario con correo ${req.body.email} ya existe` 
            })
        }
        const salto = genSaltSync()
        const encryptPassword = hashSync(password,salto)

        user = new User({name,email,password:encryptPassword})

        await user.save()

        const token = await  getJWT(user.id,user.name)

        res.status(201).json({
            ok:true,
            message:"El usuario fue creado existosamente",
            user:{
                uid:user.id,
                name:user.name
            },
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            errors:{
                server:"Error en el servidor"
            }
        })
    }

}

const refreshToken = async (req,res=response)=>{
    const {uid,name} = req.user

    try{

        const token = await getJWT(uid,name)

        return res.status(200).json({
            ok:false,
            message:"El token ha sido renovado",
            user:{uid,name},
            token
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            errors:{
                server:"No se pudo renovar token"
            }
        })
    }


}

module.exports={
    login,
    register,
    refreshToken
}