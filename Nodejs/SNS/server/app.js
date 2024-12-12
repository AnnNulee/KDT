// 1. import

// 내부적 미들웨어
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");  // cookieset
// multer는 라우터에서 사용 
// 기타
const cors = require("cors");

// 2. 서버, 라우터, 포트, env 등 설정
dotenv.config() // dotenv 쓰겠다 선언
const pageRouter = require("./routes/pageRouter");
const app = express(); // 서버생성
app.set('port', process.env.PORT || 3000); //서버 포트 설정


// 3. 미들웨어 
app.use(cors()); // 서버 - front 포트 연결
app.use(morgan('dev'));
app.use(express.json()); // body parser : 미리 파싱을 해놓아야 router에서 쓰이는 req.body()함수를 쓸 수 있다.
app.use(express.urlencoded({extended : false})); /// body parser : 
// localhost:3000/user/:id ==> 우리가 이렇게 설정해놓으면 
// localhost:3000/user/(userid) ==> 이렇게 param이 들어온다. 이 param을 각각 나눠 파싱해주는게 urlencoded body-parser 
// localhost:3000/user/(userid)?search=son ==> extended : 이런 쿼리를 파싱해주는 기능을 쓸거냐?
app.use(cookieParser(process.env.COOKIE_SECRET));




// 5. 라우터 설정 (컨트롤 쓸때) 
app.use('/', pageRouter);



//6. 에처처리 미들웨어

    //6-1. 404
app.use((req, res, next) => {
    const error = new error ( `${req.method} ${req.url} 라우터가 없습니다.`) 
    // req.method : asxios 요청(get, post 같은거)메소드
    error.status = 404;
    next(err)
});

app.use((err, req, res, next) =>{
    console.error(err); // 콘솔에 에러 찍기 
    res.status(err.ststus || 500).json({error:err.message});
})


app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`)
})