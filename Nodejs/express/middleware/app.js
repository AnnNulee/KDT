// 패키지 만들때 main으로 지정한 app.js 파일 

//dotenv는 무조건 최상단
require('dotenv').config(); // dotenv 초기화

// 상단에서는 항상 import. 
// 내가 필요한 모듈, 미들웨어 전부 최상단에서 불러와준다.
const express = require("express");
const path = require('path');
const morgan = require ('morgan');
const cookieparser = require('cookie-parser');


//서버 생성
const app = express();

const cookieSecret = process.env.COOKIE_SCERET_KEY

// PORT설정
app.set('port', process.env.PORT || 3000); // dotenv에서 import 하거나 없으면 3000

// (공통, 전역) 미들웨어 ( 개별 미들웨어는 라우터 안에서 설정)
app.use(morgan('combined')); // 사용자의 요청이 생기는것에 대한 감시 및 기록 // 
app.use(cookieparser(cookieSecret)); // 이 값으로 sign을 조금 뒤튼다. 

// 라우터 : 응답이 이루어지는 곳. ==> 순서가 엄청엄청 중요하다고
// 요청에 응답을 한번 주게되면, 그 요청은 처리된것이다. 그럼 조건에 적합한 라우터가 여러가지가 있는 경우 가장 먼저 나온 get이 요청을 처리하고 응답을 반환함. 그리고 끝.

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
        signed : true, 
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


