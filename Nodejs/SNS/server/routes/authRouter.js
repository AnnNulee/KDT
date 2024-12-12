const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middleware') // middleware로 기능 분리 
// app.js에서 passport가 라우터 위에서 실행되기 때문에, 라우터로 갔을때 passport를 사용할 수 있다. 
const { join, login, logout } = require('../controllers/auth')

//middleware는 실행되면 지혼자 못끝남. 다음 넘어가는 next를 붙여줘야됨.

// POST/auth/join : 회원가입
//router.post('/join', (req, res, next) => {}) : 원래는 이렇게이 내부에서 미들웨어, 라우터에서 실행되어야 하는 메소드를 직접 넣어서 만들었는데, 이걸 미들웨어와 컨트롤러(실행메소드)로 나눌거야
// middleware => isNotLoggedIn  : 로그인 안된 사람임을 확인하는 미들웨어, 직접 만들기
// controller => join : 실제 method는 join에서 실행됨. 이것도 직접 만든다. 
// 결국 (경로, 미들웨어, 실행method) : 미들웨어가 true면, controller(method)를 실행한다
router.post('/join', isNotLoggedIn, join)


// POST/auth/login : 로그인 : post는 데이터베이스에 새로운 데이터를 넣는게 아니라, 서버에 데이터를 전달 해야할때 post인거임!!!!
router.post('/login', isNotLoggedIn, login)


// get/auth/logout
router.get('/logout', isLoggedIn, logout)



module.exports = router;