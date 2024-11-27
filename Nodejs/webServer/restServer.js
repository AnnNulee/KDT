const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users= {} // 데이터 저장소. 유저들로부터 받은 데이터. POST로 받아줘야함.

http.createServer(async (req, res) => {   // promise 가져왔으니까 async 써줘
    try{
        // 각 req마다 수행해야하는것들을 할당
        // 첫 if문 : method 별로 나눔.
        if( req.method === "GET"){
            // 두번째 if문 : 첫번째 라우터
            if( req.url === "/"){ // .url은 슬래쉬를 끼는 라우터, 즉 pathname 이 들어간다.
                const data = await fs.readFile(path.join(__dirname, 'restFront.html')); // __dirname : 현재위치
                //path.join : 루트로 시작하는 상대경로에 "/"를 붙이고, 거기에는 restFront.html파일을 읽어주겠다.
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data); // data 전송.
            } else if (req.url === "/about") {
                const data = await fs.readFile(path.join(__dirname, 'about.html'));
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
                
            } else if (req.url === "/users") {
                res.writeHead(200, { 'Content-Type':'text/html; char=utf-8'});
                return res.end(JSON.stringify(users)) // users 데이터를 JSON 형태로 만들어 전달 
            }
            try{
                const data = await fs.readFile(path.join(__dirname, req.url));
                return res.end(data);
                
            }catch(err) {
                console.error(err);
            }
        }
        else if ( req.method === "POST") { // get과 url이 같아도 다른 페이지를 읽어줄 수 있다.       
            if(req.url === '/user'){            
                let body = '';
                req.on('data', (data) => {
                body += data;
                })

                return req.on ('end', () => {
                    console.log('POST 본문(Body):', body);
                    const { name } = JSON.parse(body); // body의 내용을 json으로 받아서 name이라는 키(구조분의 할당)의 value로 적용. 
                    const id = Date.now(); // 겹치지 않는 값으로 지금시간을 id값으로 줌. 싱글스레드에서 차례대로처리되기 때문에.
                    users[id] = name;
                    res.writeHead(201, {'Content-Type' : 'test/plain; charset=utf-8'}); // plain은 걍 문자
                    res.end('등록성공')
                })
            }          
        }
        else if ( req.method === "PUT") {
            if(req.url.startsWith('/user/')) { 
                const key = req.url.split('/')[2]; // '/' 를 기준으로 나누어 요소로 취급하고, [2]번째 요소를 선택함. 그것을 key로 설정.
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문 (Body):' , body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(201, {'Content-Type' : 'test/plain; charset=utf-8'});
                    return res.end(JSON.stringify(users));
                })
            }
        }
        else if ( req.method === "DELETE") {  /// esle 주면 안된다. 메소드가 이 4개만 있는게 아님
            if(req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                delete users[key]
                //res.writeHead(201, {'Content-Type' : 'test/plain; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404);
        return res.end('Not Found')
    }
    catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/plan; charset=utf-8'})
        res.end(err.massage);
    }
})
.listen(8080, () => {
    console.log('8080 포트 서버 실행중')
})
