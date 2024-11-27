// const http = require('http');

// http.createServer((req, res) => {
//     console.log(req.url, req.headers.cookie);
//     res.writeHead(200, {'Set-Cookie' : 'mycookie=test'}); // {'Set-Cookie' : '쿠키이름=쿠키값'}
//     res.end('<h1>Cookie</h1>')
// })
// .listen(8080, () => {
//     console.log('8080포트 서버 대기중')
// })


//------------------------------------

const http = require('http');
const fs = require('fs');
const path = require('path');


//쿠키파서 만들기
const parseCookies = (cookie = '') =>   
    //cookie = ''  :쿠키를 빈값으로 넣어놓기
    // 계속해서 기능의 결과에 또 기능을 먹이고 그 결과에 또 기능을 먹일 예정임
    
    cookie 
    // 'a=b;c=d;...' 쿠키는 key-value 한 묶음은 세미콜론(;)으로 구분된다.

    .split(';')  
    // ;으로 split 한다는건 각각의 키벨류 한쌍씩 구분해준다.
    //[a=b, c=d, ...]

    //이 나누어진 요소들은 key는 key로, value는 value로 맵핑해준다. 
    .map(v => v.split('=')) 
    // 각각 key 와 value를 요소로 가진 리스트가 생긴다. 
    // [[a, b], [c, d] , ...]]

    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v); //trim : 공백제거 / decode~: 쿼리의 아스키코드를 다시 번역해주는 기능
        return acc; 
        // {a:b, c:d, ...}
    }, {});

http.createServer(async (req, res) => { // listenig 상태임. 서버는 한번 실행시켜놓으면, 끄기 전까지는 계속 대기, 즉 리스닝 하고 있다. 요청 받을 준비. 
    //요청이 오면 headers에 담긴 쿠키 파싱 
    const cookies = parseCookies(req.headers.cookie) // object 형식으로 들어온다
    

    // 로그인 처음 했을 때 쿠키를 생성하는 단계

    // url은 포트번호(도메인) 제외한거 다 들어온다. eX) 쿼리가 같이 들어옴. ex) /login?name=nulee
        if (req.url.startsWith('/login')) { 
            // '/login'으로 들어오면 이걸 실행하겠다. 
            const url = new URL(req.url, 'http://localhost:8084'); // req로 들어온 url에는 path만 들어온다. 두번째 인수에 domain 넣어준다. 
            const name = url.searchParams.get('name'); // serchPrams는 '?'나오는 (쿼리부터?) 이후부터 'name'에 대입된 값(아스키코드버전 값)을 가져온다. 
            const expires = new Date(); // 로그인 했을때 시간 보관

            expires.setMinutes(expires.getMinutes() + 3); // 쿠키유효기간 3분
            res.writeHead(302, {
                Location : '/',
                'Set-Cookie': `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/` 
            });
            res.end();            
        } 
        
        
        // 로그인 된 상태에서 
        else if (cookies.name) {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${cookies.name}님 반갑습니다.`)
        }


        //로그인 안된상태면 cookie.html 보여줘
        else {
            try {
                const data = await fs.promises.readFile(path.join(__dirname, 'cookie.html'));
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);
            } catch (err) {
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(err.massage);
            }
        }
    }).listen(8084, () => {
            console.log('8084포트에서 서버 대기중');
});

