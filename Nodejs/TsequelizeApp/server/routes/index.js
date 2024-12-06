const express = require("express");
const router = express.Router()

const User = require("../models/Users") // User Table 호출

router.get('/', async(req, res, next)=>{
    try{
        const users = await User.findAll()
        res.send(users)
    }catch (err) {
        console.error(err)
        next(err)
    }
})


module.exports = router;