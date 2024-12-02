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


app.use((req, res, next) => {
    console.log("내가 만든 미들웨어")
    const error = new Error("에러 발생");
    error.status = 503
    next(error); // 밖에서 따오는 미들웨어는 next가 다 포함되어있다. 내가 만드는것에는 next를 넣어주어야 한다. 
})

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
// form데이터는 url로 보내지고, 폼 데이터는 'name=nulee&age=18'(파라메터값)이런식으로 들어옴.
// 이 데이터를 object형식으로로 변환해주는 미들웨어 urlencoded  
//extended: true는 , key에 대응하는 value값을 여러개의 개체 (list같은 경우)를 파싱이 가능하게 해준다. 원래는 단일값만 사용 가능함.
app.use(express.urlencoded({extended: true}))

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.status(err.status || 200).send(err.message);
})



app.post('/form', (req, res) => {
    console.log(req.body); // 미들웨어에서 처리해준 파싱 결과 
    res.send(`데이터처리완료 : ${JSON.stringify(req.body)}`)
})


app.post('/send-json', (req, res) => { // 클라이언트 측에서 서버 측으로 data를 입력해주는 용도. 
    const {name, age, major} = req.body //express.json 미들웨어에서 실행된 파싱된 데이터를 집어넣어줌
    console.log(req);
    console.log(`Parsing Data : ${name}, ${age}, ${major}`);
    res.json({message: `Parsing Data : ${name}, ${age}, ${major}`}); 
    // 자 나 json 확장자로 바꾼다~          // send나 end 같은건가? ㅇㅇㅇ
    // send 면 문자나 html을 보내는것 . json은 json을 보내는 것. (message라는 키값에 데이터 입혀서 응답보냄)
})


app.use(express.static(path.join(__dirname, 'public'))) // 'public'이라는 폴더를 static폴더로 사용하겠다. 








// 라우터 : 응답이 이루어지는 곳. ==> 순서가 엄청엄청 중요하다고
// 요청에 응답을 한번 주게되면, 그 요청은 처리된것이다. 그럼 조건에 적합한 라우터가 여러가지가 있는 경우 가장 먼저 나온 get이 요청을 처리하고 응답을 반환함. 그리고 끝.
// get은 함수다. url과 callback 원래 이렇게 두개를 쓰는게 정석. 그런데 그 가운데 뭐 기능이 필요하면 그안에 끼어넣는게 middleware
// 애초에 url과 callback을 하는 두가지가 그 get의 역할임. 그렇기 때문에 중간에 잡다한 함수를 써주는게 딱히 좋은건 아님. 그래서 middleware에서 정의해줌 
// middleware에서 필요한 값을 먼저 짜놓고 get에서는 불러다만 쓸 수 있게 만들어야 한다. 


//싱글파일 업로드
app.post('/upload', upload.single('file'), (req, res) => {  
    // upload.single('file')은 middleware이지만 전역이 아니기때문에 라우터에
    // 여기서 upload는 위에서 지정한 multer에서 single과 arrray 등이 파일을 저장해주는 기능을 가지고 있다. 
    // 이것은 req, res 가운데서 파일을 저장해주는 기능이므로, 여기서는 이게 middleware임. middleware라고 해서 반드시 app.use로 사용하지 않아도 된다.
    // middleware는 인수가 3개. 
    //차례대로 req는 '/upload',  res는 single 'file'을 upload,  next는 아래 콜백.
    console.log(req.file)
    res.send(`File Upload Complate : ${req.file.filename}`)
})

//멀티파일 업로드
app.post('/upload', upload.array('files', 5), (req, res) => {
    console.log(req.files);
    res.send('Multiple File Upload')
})


app.get('/session', (req, res, next) => {
    if (req.query.skip) { //session?skip=true
        return next("route")
    }else {
        req.session.data = {name : 'soondong', role: 'admin'}
        res.send("세션정보 저장 완료")
    }
})

app.get('/session', (req, res) => {
    res.send("다른 라우터 동작")
});

app.get('/session/clear', (req, res) => {
    //req.session/destroy() // 세션정보 삭제 (쿠키 유지)
    res.clearCookie('connect.sid') //쿠키 삭제
    res.send("세션을 삭제하였습니다.")
})

app.get('/session/read', (req, res) => {
    if (req.session) {
        res.send(`세션 정보 : ${req.session.data.name}`)
    }else {
        res.send("세션 정보가 없습니다.")
    }
})

//쿠키파서
// app.get('/', (req, res) => {
//     // Cookies that have not been signed
//     console.log('Cookies: ', req.cookies)
  
//     // Cookies that have been signed
//     console.log('Signed Cookies: ', req.signedCookies)
//     res.send('cookie parser')
// })

app.get('/cookie/', (req, res) => {
    console.log('쿠키됐다');
    res.cookie('name', 'nulee', { // 쿠키생성 // 첫 인자가 브라우저상에 띄워지는 이름key, 두번째가 value
        signed : true,  // 조금 복잡한 데이터로 (보안상) 바꾼다
        maxAge : 60000, //초 단위, 1분 줌
        httpOnly : true,
        path : '/',
    });
    console.log('쿠키됐다');
    res.send('쿠키생성완료');
});

app.get('/cookie/read/', (req, res) => {
    const userCookie = req.signedCookies.name;
    if (userCookie) {
        console.log(req.signedCookies);
        res.send(`쿠키는 ${userCookie}`);
        console.log(req.signedCookies);
    } else {
        res.send("쿠키 업서요");
    }
})

app.get('/', (req, res)=>{
    res.send('helloworld'); 
    // res.writeHead, write, end 모든 기능이 다 들어 있다. 
    //res.send 실행되면 응답이 끝난 것. 근데 그 기능을 쓰면 중복은 안됨. 
})


app.get('/category/book', (req, res) => {
    res.send("book");
})

app.get('/category/note', (req, res) => {
    res.send("note");
})

app.get('/category/*', (req, res) => {  
    // '*' 이런 와일드카드를 쓸때는 밑에서 떨어지는 요청을 받아줘야 한다. 
    // 와일드카드 경로가 위에있으면 category에 해당하는 모든 요청에 응답해버리기 때문에 book, note는 실행되지 않음
    res.send("카테고리 모든 요청 처리");
})

app.get('*', (req, res) => {  // 이렇게 정해지지 않은 요청을 처리해줄 수 있다. 
    res.send("정해진 경로가 없다")
})

// listen에서 요청을 받고 코드 이 이전부터 시작. 
// 서버 실행. 위에있으면 안된다. 위에있으면 서버가 이미 실행된 후에는 아래 코드가 먹지 않는다. 때문에 코드를 다 실행시킨 후 최종 서버를 실행해야하는것. 
app.listen(app.get('port'), () => { //요청을 '듣는', 대기하는 역할. script는 한번 읽고 끝난다. 이벤트를 기다리며 이전 코드의 무한 루프에 들어간다.
    console.log(`${app.get('port')}번 대기중.`) 
})


