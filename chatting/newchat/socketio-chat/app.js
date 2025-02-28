const express = require('express');
const http = require('http');
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app); // 서버실행
const io = new Server(server, {
    transports:['websocket']
});  // socket io 실행

app.use(express.static(__dirname + '/public'));

// 기본 페이지
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 사용자 정보 저장 객체
const users = {};
let userCount = 1;

// 사용자 접속시 소켓 연결 
io.on('connection', (socket) => {
    const userName =  `User${userCount++}`;
    users[socket.id] = userName;
    console.log(`${userName} connected`);

    // 클라이언트에 유저명 전달
    socket.emit(`set Username`, userName);

    // 채팅 메세지 이벤트 처리
    socket.on('chat message', (msg) => {
        io.emit('chat message', { user : users[socket.id], text : msg}); // 오브젝트 형식으로 데이터 주고받음
    });

    //연결 종료시
    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} disconnected`);
        delete users[socket.id];
    })

});

//서버 작동

server.listen(3000, () => {
    console.log('3000번 포트 서버 대기중');
})