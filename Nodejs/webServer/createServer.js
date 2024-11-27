// 노드에서 서버 만드는 법
const http = require('http');


http.createServer((req, res) => {  //(요청, 응답)
    //만들기는 끝. 아직 라우터도 없고 아무것도 없다.    
    res.writeHead(200, {'Content-Type' : 'text/html; charset = utf8' }); // http head 느낌
    res.write('<h1>Hello 8080</h1>'); // 바디
    res.end('<p>Node Server</p>'); // 종료할 때
})
.listen(8080, () =>{ // 서버 포트번호. 로컬 호스트 등 주소는 같지만, 각각 포트가 다르다. 
    console.log('8080포트에서 서버 대기중');
});


http.createServer((req, res) => {  //(요청, 응답)
    //만들기는 끝. 아직 라우터도 없고 아무것도 없다.    
    res.writeHead(200, {'Content-Type' : 'text/html; charset = utf8' }); // http head 느낌
    res.write('<h1>Hello 8081</h1>'); // 바디
    res.end('<p>Node Server 8081</p>'); // 종료할 때
})
.listen(8081, () =>{ // 서버 포트번호. 로컬 호스트 등 주소는 같지만, 각각 포트가 다르다. 
    console.log('8081포트에서 서버 대기중');
});


// 코드 수정하면 코드를 껐다가 켜야한다. 