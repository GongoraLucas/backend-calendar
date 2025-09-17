const moongose = require("mongoose")

const url = process.env.DB_URL

const connectDB = async()=>{
    try{

        await moongose.connect(url)
        console.log("Conexión exitosa")


    }catch(error){

        throw new Error("Error al conectar con la base de datos")

    }
}

module.exports={
    connectDB
}