// 필요한 모듈 불러오기
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");

const app = express(); // 서버생성

//PORT 설정
app.set('port', process.env.PORT || 3000);

//(공통)미들웨어
app.use(morgan('combined'));
app.use(cookieparser("scretKey")); // 모든 쿠키에 대해서 사용함.

//라우터
// app.get('/', (req, res)=>{
//     // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
//     // res.end("Hello World")
//     res.send('Hello World')
// })

app.get('/', (req, res)=>{
    res.cookie('name', 'soondong', {
        signed: true,
        maxAge: 60000,
        httpOnly: true, 
        path: '/',
        
    })
    res.send('쿠키 생성 완료')
})

app.get('/cookie/read/', (req, res) =>{
    const userCookie = req.signedCookies.name;
    if (userCookie){
        console.log(req.signedCookies)
        res.send(`쿠키는 ${userCookie}`)
        console.log(req.signedCookies)
    }else{
        res.send('쿠키 정보가 없습니다.')
    }
})