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
const mongoose = require("mongoose")
const session = require('express-session');
const passport = require('passport'); // 이 인증 미들웨어는 session이 있어야 쓸 수 있기에 session 다음에 나와야 함
const LocalStrategy = require('passport-local');

// 2. 서버, 라우터, 포트, env 등 설정
dotenv.config() // dotenv 쓰겠다 선언. congfig를 써야 사용가능.

    // 라우터 파일 불러오기.
const pageRouter = require("./routes/pageRouter");
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');

// 스키마
const User = require("./schemas/user");


//webserver
const app = express(); // 서버생성
app.set('port', process.env.PORT || 3000); //서버 포트 설정

// mongoose로 DB연결 및 요청. 
// schemas/index.js 는 원래 이 기능을 담고 있기때문에, 현재 app.js에 설정을 해주면 따로 index schema가 있을 필요가 없다. 
mongoose.connect(process.env.DB_URI).then(() => { 
    console.log("DB연결 성공")
}).catch ((err) => {
    console.log("#######에러발생#####")
    console.error(err)
})

// 3. 미들웨어 
app.use(cors(
    { origin : "http://localhost:8080" , // 프론트엔드주소
        credential : true},
)); // 서버 - front 포트 연결
app.use(morgan('dev'));
app.use(express.json()); // body parser : 미리 파싱을 해놓아야 router에서 쓰이는 req.body()함수를 쓸 수 있다.
app.use(express.urlencoded({extended : false})); /// body parser : 
// localhost:3000/user/:id ==> 우리가 이렇게 설정해놓으면 
// localhost:3000/user/(userid) ==> 이렇게 param이 들어온다. 이 param을 각각 나눠 파싱해주는게 urlencoded body-parser 
// localhost:3000/user/(userid)?search=son ==> extended : 이런 쿼리를 파싱해주는 기능을 쓸거냐?
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({ // 쿠키가 있어야 세션을 만드니까 쿠키파서 밑에.
    resave : false, // 세션은 데이터를 저장해서 안전하게 전달하는것. 인증정보같은거. 요청이 들어올때 세션을 포함해서 들어옴. 이전에 받은 요청의 세션과 지금 받은 세션이 같을때, 그것을 또 저장하겠냐? 
    saveUninitialized: false, // 세션이 초기화 되지 않은 상태일 때, 저장하겠냐? => 세션의 데이터가 비어있다. 빈 데이터를 저장하겠냐?
    secret : process.env.COOKIE_SECRET, // 해당 환경변수로 signed 만들겠다. 
    cookie : {
        httpOnly : true, // js로 접근 막는다. 
        secure : false, // Https에서만 쓰겠다. false면 그냥 http도 가능
        maxAge : 1000*60*5 // 5분. 세션 만료기간 기준은 미리세컨드. (1s = 1000ms) 
    }
}))



// passport가 라우터 위에서 실행되기 때문에, 라우터로 갔을때 passport를 사용할 수 있다. 
app.use(passport.initialize()); // 패스포트 사용하겠다. 
app.use(passport.session()); // 인증방법론은 여러개가 있는데, 우리는 여기서는 인증전략 중 session을 쓰겠다.

//passport-serialize : 세션을 만들 때 저장할 정보를 정의., signed시켜 안전하게 저장시켜줌. 세션에 사용자 id 저장
passport.serializeUser((user, done) => {
    console.log('Serialize User:', user)
    done(null, user._id)
})

//passport-deserialize : 세션에 저장된 정보를 복원하여 DB와 비교하여 확인함. request가 다시들어올때 같이 들어오는 세션을 자꾸 확인을 해야한다. 
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err){
        console.error(err);
        done(err)
    }
});


// 5. 라우터 경로 설정해주기 (컨트롤 쓸때) 

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
//app.use('/user', userRouter);



//6. 에러처리 미들웨어

    //6-1. 404
app.use((req, res, next) => {
    const err = new Error ( `${req.method} ${req.url} 라우터가 없습니다.`) 
    // req.method : asxios 요청(get, post 같은거)메소드
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) =>{
    console.error(`에러임((${err}))`); // 콘솔에 에러 찍기 
    res.status(err.ststus || 500).json({error:err.message});
})


app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`)
})