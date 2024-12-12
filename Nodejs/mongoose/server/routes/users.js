const express = require('express');
const User = require('../models/users');
const Comment = require('../models/comments');

const router = express.Router();

router.route('/')
.get( async (req, res, next) => {
    try { 
        const users = await User.find({});
        // console.log(users);
        res.json(users);
    } catch(err) {
        console.error(err);
        next(err);
    }
})
.post( async (req, res, next) => {
    try {
        const user = await User.create({
            name : req.body.name, 
            // req.body.(key) 이름이 다르면 파싱이 안돼서 에러가 난다. 해당 값이 없으면 모델에서 정의한 required:true가 충족되지 않아 에러가 난다. required가 아니면 에러 안남. 매치되지 않아 값이 안들어오면 null로 들어오니까. 
            age : req.body.age,
            merried : req.body.merried,
        })
        res.end() // 응답 받는쪽에서 res 변수를 만들어놓지 않음 ( 응답 받지 않음 )
        // res.status(201).end()
    }catch(err){
        console.error(err);
        next(err);
    }
})


// id를 입력해서 해당 comments 데이터 가져오기
router.get('/:id/comments', async (req, res, next) => 
{
    try{
        const comments = await Comment.find({commenter: req.params.id})
        .populate('commenter')
        console.log(comments)
        res.json(comments)
    }catch(err) {
        console.error(err)
        next(err)
    }
})

module.exports = router;