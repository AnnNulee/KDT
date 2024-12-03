const express = require("express");
const cors = require("cors");
const router = require('./routes'); //index
const imgUpload = require('./routes/imgUpload');
const path = require('path');

const app = express();

// 미들웨어 만들기
app.use(cors()); // 열려있는 포트끼리 데이터를 주고 받을 때 오류가 생기는데 그걸 안생기게 해줌. 다른 포트에서 요청하는 데이터를 다 잡아주게 해줘서 보안에 약함. 근데 보안을 위한 어쩌고가 있다. 
app.use(express.json()) // 파싱
app.use('/uploads', express.static(path.join(__dirname,'uploads')));


app.use('/', router);
app.use('/img', imgUpload);

app.listen(3000, ()=>{
    console.log('3000번 포트에서 서버 가동중')
})