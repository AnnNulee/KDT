const express = require('express');
const router = express.Router(); // 라우터설정
const Comment = require('../models/comments') // 사용할 모델
const User = require('../models/users')



router.route('/')
.get(async(req, res, next) => {
    try {
        const comments = await Comment.find({});
        res.json(comments)
    } catch(err) {
        console.error(err);
        next(err)
    }
})
    // 이름으로 id 찾는 방법 1. front에서 id 골라서 보내기
// .post(async (req, res, next) => {
//     try{
//         const comment = await Comment.create({
//             commenter : req.body.userid,
//             comment : req.body.comment,
//         });
//         res.json(comment)
//     }catch(err) {
//         console.error(err);
//         next(err)
//     }
// })
    // 이름으로 id 찾는 방법 2. front에서 name 보내고 server에서 id찾기.
.post(async (req, res, next) => {
    try {
        const userId = await User.findOne({name: req.body.userid})
        // findOne()._id로 넣으면 undefine값이 나온다 : User.findOne()._id 전체는 비동기가 아니고 findOne() 함수만 비동기이기 때문에 순서가 꼬여서 ._id값이 비어있는걸 수 있음. 
        //해서 '_id'찾는 작업은 create 함수의 콜백에 먹여 순서를 확실히 해준다. 
        const comment = await Comment.create({
            commenter : userId._id,
            comment : req.body.comment,
        });
        console.log(comment);
        res.json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
})


router.route('/:id') // 프론트 serchCo
.patch(async (req, res, next) => {
    try {
        const result = await Comment.updateOne({_id : req.params.id},{comment : req.body.text}) 
    res.json(result)
    }catch(err){
        console.error(err);
        next(err);
    }
})
.delete(async (req, res, next) => {
    try {
        await Comment.deleteOne({_id:req.params.id})  
        // 여기서의 id는 위에서 라오터 바인딩을 /:id 로 바인딩을 했기때문에, 프론트에서 userid param으로 보낸 값을 id로 받아 사용할 수 있는 것. 
        //destroy는 sequelize 문법, delete는 mongoDB, mongoose 문법.
        res.end()
    } catch(err) {
        console.error(err);
        next(err)
    }
})



module.exports = router;