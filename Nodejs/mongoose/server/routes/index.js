const express = require('express');
const router = express.Router(); // 라우터설정

const User = require("../models/users")


// users 모델의 모든내용 반환. 
router.get('/', async(req, res, next) =>{
    try{
        const users = await User.findAll()
        res.send(users)
    }catch (err) {
        console.error(err)
        next(err)
    }
})





module.exports = router;