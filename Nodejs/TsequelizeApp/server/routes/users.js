const express = require("express");
const router = express.Router()
const User = require("../models/Users");
const Comment = require("../models/Comments")

// User 정보를 처리할 API 목록
// 전체 사용자 조회
// 사용자 정보 입력
// 사용자 정보 수정
// 사용자 정보 삭제
// 특정 사용자 검색
// 사용자 ID를 이용한 코멘트 검색

router.route('/')
.get(async (req, res, next)=>{ //User모델의 데이터 불러오기 요청
    try{
        const users = await User.findAll();
        res.send(users) // json으로 바꾸기
    }catch(err){
        console.error(err)
        next(err)
    }
})
.post(async (req, res, next)=>{ //User 모델의 데이터 입력 요청
    try{
        const user = await User.create({
            name: req.body.username,
            age: req.body.age,
            married: req.body.married,
            comment: req.body.comment 
            // view페이지에서 data에 정의되지 않은 속성이기에 req.body.comment는 값이 없다. undefined 
        });
        console.log(user);
        res.end()
    } catch(err) {
        console.error(err);
        next(err);
    }
})


// id를 입력해서 해당 comments 데이터 가져오기
router.get('/:id/comments', async ( req, res, next)=>{
    try{
        const comment = await Comment.findAll({
            include:{
                model: User,
                where: {id: req.params.id}
            },
        });
        console.log(comment)
        res.json(comment)
    }catch(err) {
        console.error(err)
        next(err);
    }
})



module.exports = router;