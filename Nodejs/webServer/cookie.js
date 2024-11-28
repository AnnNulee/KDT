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
//파싱은 데이터를 읽어서 구조화된 정보로 변환하는 과정.
// 보통 컴퓨터 프로그램이 이해할 수 있는 형태로 데이터를 분석하고 나누는 것을 뜻
const parseCookies = (cookie = '') =>   
    //cookie = ''  :쿠키를 빈값으로 넣어놓기. 빈 '문자열' 
    // 계속해서 기능의 결과에 또 메서드를 먹이고 그 결과에 또 메서드를 먹일 예정임
    // 중괄호 없는 이유 : 코드가 여러줄이면, (필요한 경우, 이 경우에는 추후 이 값을 cookie 변수에 대입할 예정)어떤 최종값을 산출할 것인지에 대해 return으로 정의해주어야하는데 이건 어차피 한줄짜리 문자열이 결과로 나오기 때문에 return이 하나, 곧 그것이 결괏값이된다. 
    
    cookie // 이 한줄짜리 문자열에 여러가지 method (split().map().reduce())를 먹일 예정
    // 'a=b;c=d;...' 쿠키 key-value 한 묶음이 세미콜론(;)으로 구분된다.

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



// 서버를 만들면 '라우터'를 다 나눠줘야한다. 
http.createServer(async (req, res) => { //req를 받을때, res를 어떻게 줄것인가? 를 정의하는 코드  
// >> 요청을 받을 때 마다 실행된다. 
// >> 해당 코드는 res를 짜내는 공식이다. 


    // listenig 상태임. 서버는 한번 실행시켜놓으면, 끄기 전까지는 계속 대기, 즉 리스닝 하고 있다. 요청 받을 준비. 
    
    //요청이 오면 headers에 담긴 쿠키 파싱 
    const cookies = parseCookies(req.headers.cookie) // object 형식으로 들어온다
    

// 도메인 html에서 input으로 데이터를 넣은 요청을하면 /login이 실행(라우터연결)된다.
// 로그인 처음 했을 때 쿠키를 생성하는 단계
// (로그인을 누르면, /login으로 연결) login 라우터로 들어왔을 때 if문 실행   
        if (req.url.startsWith('/login')) {  // "login이 들어오면 해당 코드를 실행하라"
            // url은 포트번호(도메인) 제외한거 다 들어온다. eX) 쿼리가 같이 들어옴. ex) /login?name=nulee 
            const url = new URL(req.url, 'http://localhost:8084'); // req로 들어온 url에는 path만 들어온다. 두번째 인수에 domain 넣어서 완성된 url을 만들어줌.  
            const name = url.searchParams.get('name'); 
            // html의 input으로 받은 data는 url에 쿼리형식으로 포함되어 전송된다. 
            //serchPrams는 '?'나오는 (쿼리부터?) 이후부터 'name'에 대입된 값(아스키코드버전 값)을 가져온다. 
            const expires = new Date(); // 로그인 했을때 시간 보관

            expires.setMinutes(expires.getMinutes() + 3); // 쿠키유효기간 3분
            res.writeHead(302, {
                Location : '/', // 리다이렉트 시키는 로케이션. 
                // 여기로 redirec 되면 루트 req.가 다시 들어간다. 
                // 근데 지금은 cookies.name 값이 있는 상태이므로 else if에 있는 코드가 실행된다. 
                'Set-Cookie': `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/` 
                // cookie 나 url에는 한글이 들어가면 안되고, 아스키코드로 변환된다. 그래서 쿠키에 
                // HttpOnly : JS 등으로 뭔가 영향을 끼치지 못하게 http만 허락한다. 
                // path : 이 경로부터 포함하여 쿠키를 사용한다. 
            });
            res.end();            
        } 
        
        
        // cookie에 name값이 있는경우는 = 로그인 된 상태에서는 인사해줘 
        else if (cookies.name) { // cookies에 name 이 있냐? : 로그인 되어있냐?
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

