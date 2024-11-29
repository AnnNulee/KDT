const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'test/html; chatset = utf-8'});
    res.write('<h1>createServer로 서버만듦</h1>');
    res.end('<p>Node Server</p>');
})
.listen(8080, () => {
    console.log('8080포트에서 서버 대기중');
});


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.write('<h1>createServer로 서버만듦</h1>');
    res.end('<p>Node Server</p>');
})
.listen(8081, () => {
    console.log('8081포트에서 서버 대기중');
});

