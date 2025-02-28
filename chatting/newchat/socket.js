// const webSocket = require('ws');

// module.exports = (server) => {

//     // 웹소켓 서버 생성
//     const wss = new webSocket.Server({server});

//     // 클라이언트 접속 감지
//     // ws : 웹소켓 에서 쓰는 접속한 클라이언트 객체 
//     // req : http에 대한 정보를 담음
//     wss.on('connection', (ws, req) => {  
//         const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // 사용자의 ip를 가져오는 방법 , 리스폰스를 주기 위한 주소가 필요하니까.. 헤더정보에 담아 보내준다. 
//         console.log('새로운 클라이언트 접속', ip);

//         ws.on('message', (message) => { // 클라이언트가 발송하는 메세지
//             console.log(message.toString());
//         });

//         ws.on('error', (error) => {
//             console.log(error);
//         });

//         ws.on('close', () => { // 연결종료. 
//             console.log('클라이언트 접속 해제 :', ip); //연결종료 알림
//             clearInterval(ws.interval); // 클라이언트가 자동으로 메세지를 보내게 하는 타이머를 종료. 타이머가 3초마다 뭔가를 찍고있는데, 나가면 이 타이머는 끝나지 않으니까 따로 이렇게 끝내줘야햄
//         })

//         ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
//             if (ws.readState == ws.OPEN) {
//                 ws.send('서버에서 클라이언트로 메시지를 보냅니다');
//             }
//         }, 3000); // 3초
//     });

// };

const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => { // 웹소켓 연결 시
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('새로운 클라이언트 접속', ip);
    ws.on('message', (message) => { // 클라이언트로부터 메시지
      console.log(message.toString());
    });
    ws.on('error', (error) => { // 에러 시
      console.error(error);
    });
    ws.on('close', () => { // 연결 종료 시
      console.log('클라이언트 접속 해제', ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
      if (ws.readyState === ws.OPEN) {
        ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
      }
    }, 3000);
  });
};
