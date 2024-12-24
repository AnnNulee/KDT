const express = require("express");
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../middleware');
const {renderJoin, renderMain, renderProfile} = require('../controllers/page');


router.get('/profile', isLoggedIn, renderProfile); // 사용자정보
router.get('/join', isNotLoggedIn, renderJoin); // 회원가입
router.get('/', renderMain); //메인

//  http://localhost:3000
// router.get('/', (req, res, next )=> {
//     res.end('연결 성공')
// })

module.exports = router;