
const express = require("express")
const { verifyJWT } = require("../middlewares/JWTValidator")
const { check } = require("express-validator") 
const { verifyDate } = require("../helpers/DateValidator")
const { verifyErrors } = require("../middlewares/fieldsValidator")
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/calendar")
const router = express.Router()

router.use(verifyJWT)

router.get(
    "/events",
    getEvents
    
)

router.post(
    "/",
    [
        check("title","el titulo es requerido").not().isEmpty(),
        check("start","La fecha inicial es requerida").custom(verifyDate),
        check("end","La fecha final es requerida").custom(verifyDate),
        verifyErrors    
    ],
    createEvent

)

router.put(
    "/events/:id",
    [
        check("title","el titulo es requerido").not().isEmpty(),
        check("start","La fecha inicial es requerida").custom(verifyDate),
        check("end","La fecha final es requerida").custom(verifyDate),
        verifyErrors  
        
    ],
    updateEvent
)

router.delete(
    "/events/:id",
    [],
    deleteEvent
)

module.exports=router