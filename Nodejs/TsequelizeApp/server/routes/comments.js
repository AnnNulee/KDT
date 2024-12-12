const express = require("express");
const router = express.Router()
const Comment = require('../models/Comments') // 사용할 모델
const User = require('../models/Users')



// 원래 우리가 배우기로는
//router.get('/') 혹은 router.post('/') 이렇게 써주는데
// 경로가 같으면 route먼저 넣고 그 뒤로 이어서 붙여주면 된다. 
////router.get('/') + router.post('/') => router.route('/').get().post()

router.route('/')
.get(async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            // Comment 다 가져오면서
            // user모델에서, pk가 일치하는 { name : "value" }를 포함해줄게
            // User은 끌고온 Comment 데이터속 하나의 key가 된다.  
            include : {
                model : User,
                attributes: ['name'] //Forien key와 대응되는 name값
            }
        }); // comment 모델에 있는 data 모두.
        res.json(comments) // send로 가도 상관없는데, 만약 안들어가면 json이 더 확실하다. object로 파싱할거니까/
    }catch(err){
        console.error(err); // 내 콘솔에 에러메세지 찍는것. 
        next(err); // 에러가 난다면, app.js의 에러처리 미들웨어로 내려가도록.
    }
})
.post(async (req, res, next) => { // Comment모델 데이터 입력 create
    try{
        
        const comment = await Comment.create({  
            // 모델에서 key(컬럼)값 정의됨
            // 모델의 컬럼에 들어갈 value값들 매핑
            commenter : req.body.userid, 
            comment : req.body.comment,
        });
        console.log(comment);
        res.end()
    }catch(err){
        console.error(err);
        next(err);
    }
})


router.route('/:id')
.patch(async (req, res, next) => {
    try {
        const {id} = req.params;
        const {text} = req.body; // const text = req.body.text;
        await Comment.update(
            // (Comment 모델의) comment 컬럼에 text적용
            {comment : text}, 
            // where 조건, 안에는 object { 모델의 id 컬럼 : prams.id } 적용.  
            {where : {id}} 

        )
        res.end()
    } catch (err){
        console.error(err);
        next(err);
    }
})
.delete(async (req, res, next) =>{
    try {
        const {id} = req.params;
        await Comment.destroy(
            {where : {id}}
        )
        console.log("삭제완료")
        res.end() // 찍어줘야 axios가 끝난다
    } catch (err) {
        console.error(err);
        next(err);
    }
})










module.exports = router;