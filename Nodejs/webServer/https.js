const https = require('https');
const fs = require('fs');

https.createServer({ // https는 먼저 인증과정을 거친다. 첫번째 인수로 먼저 인증서를 먼저 받고 req, res 등 i/o은 나중에 처리함.  
    // 서버의 초기화 과정. 소비자의 action이 발생하지 않는다. I/O가 많지 않다. 그렇기 때문에 비동기처리가 의미가 없다.
    // 동기적인 진행은 개발자 입장에서 이해하기 쉽고 직관적이다. => 코드가 안정적.
    // 인증서 param은 object 형식. 어디선가 불러서 사용할 수 있음. 순서지켜주는 의의도 있을수도
    // req, res가 주어지면 매 req마다 res를 생성한다. 하지만 이건 req, res 개념이 아님. 
    cert: fs.readFileSync("도메인 인증서 경로"),
    key: fs.readFileSync("도메인 비밀 키 경로"), 
    ca: [  // ca에서 인증받은 인증서
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(443, () => {
      console.log('443번 포트에서 서버 대기 중입니다!');
    });