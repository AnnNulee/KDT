// 패키지 만들때 main으로 지정한 app.js 파일 

//dotenv는 무조건 최상단
require('dotenv').config(); // dotenv 초기화

// 상단에서는 항상 import. 
// 내가 필요한 모듈, 미들웨어 전부 최상단에서 불러와준다.
const express = require("express");
const path = require('path');
const morgan = require ('morgan');
const cookieparser = require('cookie-parser');
const session = require('express-session');
//바디파서는 express 내장.
const multer = require('multer');


//라우터 불러오기
const indexRouter = require('./routes'); //생략해도 알아서 index 가져옴
const userRouter = require('./routes/user');

//서버 생성
const app = express();
const cookieSecret = process.env.COOKIE_SCERET_KEY

// PORT설정
app.set('port', process.env.PORT || 3000); // dotenv에서 import 하거나 없으면 3000



//변수선언 : 미들웨어 위에서 해주는게 좋다.
// 저장경로와 파일 이름 정해주는 변수
const storage = multer.diskStorage({ // 저장위치 설정. 서버메모리 / 하드디스크 / 클라우드 s3, gcp 구글스토리지. 선택가능. 이건 하드디스크
    destination: (req, file, cb) => {  // 파일 저장경로. 요청과 파일이 들어오면, 어떤 곳에 저장(콜백)할거냐?
        cb(null, 'uploads/') // 업로드 경로, 실제 파일경로
    },
    filename: (req, file, cb) => { 
        // 파일이름이 같으면 덮어쓰기가 되기때문에, filename은 unique값이어야 한다. 기존 filename은 client가 주는것이기 때문에 변경시켜줘야함
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)) // originalname : 파일 전체이름 / fieldnme : 파일이름 /  extname : 확장자
    }
});

const upload = multer({ // 멀터 자체가 미들웨어가 아니다. 멀터 안에있는 함수가 미들웨어임. 
    storage: storage, 
    limits : {fileSize : 1024*1024*5}, //파일 크기 제한.  5메가 이상 안됨 // limit : multer 내의 속성
})
// 들어오는 파일을 어디에 어떻게 저장하는지 변수로 설정해주는데,  경로-이름과 limit은 왜 따로 설정하는가?   : 함숙 ㅏ이렇게 만들어짐



// (공통, 전역) 미들웨어 ( 개별 미들웨어는 라우터 안에서 설정)

app.use(morgan('combined')); // 사용자의 요청이 생기는것에 대한 감시 및 기록 // 
app.use(cookieparser(cookieSecret)); // 이 값으로 sign을 조금 뒤튼다. 

//세션
app.use(session({
    secret: process.env.SESSION_SECRET, // key값
    resave : false, // 이게 뭔데
    saveUninitialized : true,
    cookie : {maxAge : 60000, httpOnly:true}
}));
app.use(express.static(path.join(__dirname, 'public', 'imgs'))) // 정적인 파일...어쩌구 화면띄워주기

//body-parser 미들웨어
app.use(express.json()); // 받은 json 데이터를 모두 파싱해준다.

//body-parser(urlencoded) 미들웨어
app.use(express.urlencoded({extended: true}))

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.status(err.status || 200).send(err.message);
})



//***********************라우터*************************** */
//라우터를 분류해주는 코드

// 1. 기본 url
app.use('/', indexRouter)

// 2. /user/ 다음에 나오는 url
app.use('/user', userRouter)



    //error처리 미들웨어
// 경로에서 벗어난것들 처리해주는 짜가 에러. 
app.use((req, res, next) => {
    res.status(404).send('not found');
})

// 진짜 에러 처리해주는거. (인수 4개. err 포함)
app.use((err, req, res, next) =>{
    console.error(err);
    res.status(500).send
})







// 서버 실행
app.listen(app.get('port'), () => { 
    console.log(`${app.get('port')}번 대기중.`) 
})


