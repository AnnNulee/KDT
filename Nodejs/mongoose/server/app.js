// 1. 모듈 import
const express = require('express'); // 서버 생성
const path = require('path'); // path의 구분자(슬러쉬)가 여러 유형이 있는데, 그걸 맞춰줌
const cors = require("cors") // front와 server의 포트(서버) 연동
const morgan = require('morgan'); // 요청 log 생성

// 6. router import (router 변수 생성)
const indexRouter = require('./routes');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');

// 7. model import
const connect = require('./models')

// 2. 미들웨어 생성
const app = express() // 'app' 서버 생성
app.set('port', process.env.PORT || 3000); // 포트설정

connect(); // 포트 설정되면 바로 MongoDB 실행 : 내부에 있는 컬렉션들 다 끌어온다. 

app.use(morgan('dev')); // log생성, 상세하게(dev)
app.use(cors());
app.use(express.json()); // body parser : 미리 파싱을 해놓아야 router에서 쓰이는 req.body()함수를 쓸 수 있다.
app.use(express.urlencoded({extended: false})); // body parser : 
// localhost:3000/user/:id ==> 우리가 이렇게 설정해놓으면 
// localhost:3000/user/(userid) ==> 이렇게 param이 들어온다. 이 param을 각각 나눠 파싱해주는게 urlencoded body-parser 
// localhost:3000/user/(userid)?search=son ==> extended : 이런 쿼리를 파싱해주는 기능을 쓸거냐?


// 5. 라우터 생성
// server 내부에 routes 폴더 생성, index, comments, users 라우터 파일 생성하고
// app.use('도메인', 'router import 에서 설정한 라우터변수이름')
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);



// 3. 에러처리 미들웨어 

    // 3-1. 404 처리
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error)
})

    // 3-1. error 처리
app.use((err, req, res, next) => {
    console.error(err); //콘솔에 에러 찍기
    res.status(err.status || 500).json({error : err.message});// 에러먹이거나, 혹시 없으면 500
})


// 4. req 받기. 요청 실행!
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`)
})