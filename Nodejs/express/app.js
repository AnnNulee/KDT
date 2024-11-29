// 지금 이 파일, app.js가 서버의 메인 스크립트 파일



const express = require("express");
const path = require("path");
const morgan = require("morgan");
const fs = require('fs');


// express에서는 서버를 app이라고 부른다. 
const app = express(); // 서버 생성 명령어

// const PORT = process.env.PORT || 3000; // 중요한 값들 지정해서 모아놓는 방법 
app.set('PORT', process.env.PORT || 3000 ); // 포트설정


//미들웨어 : app.use(미들웨어이름)
// moran 미들웨어 사용 
// morgan은 요청데이터를 쌓아준다. 

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream : logStream}));


// 라우터 설정
// 너저분한 기능들은 죄다 미들웨어에서 수행해준다. 라우터는 딱 라우터의 역할만 한다. 
// express 말고 그냥 node로 서버 만들었을때, method 별로 상황 만들어준것처럼 이것도 상황별로하면 돼.
app.get('/', (req, res) => {
    res.send("app.get에서 req에 대한 res로 보낼 문자열");
});
 
app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
});






app.listen(app.get('PORT'), () => { // app.set으로 port번호 등록하면 app.get으로 접근 가능 
    console.log(`${app.get('PORT')}번 포트에서 서버 대기중`)  
}); 