const http = require('http');
const fs = require('fs');
const path = require('path');

//쿠키파서 만들기
const parseCookies = (cookie = '') => cookie.split().map().reduce();

http.createServer(async (req, res) => {
    const cookie = parseCookies(req.headers.cookie)
        
    if (req.url.startsWith('/login')) {
    //인풋에서 data 받기. 'name', 'expires'등 쿠키 요소 정의
        // 풀 url 만들기
        const url = new URL(req.url, 'http://localhost:8084');
        // 입력에서 name 값 따와 변수에 대입
        const name = url.searchParams.get('name');
        // 로그인 당시 시간 보관 
        const expires = new Date();
    
    //응답설정. + 쿠키생성.
        // 시간 변경 (로그인 당시 '분' + 3);
        expires.setMinutes(expires.getMinutes() + 3);
        // 응답 헤드 설정 : 로그인 후에 메인으로 redirect:302 
        res.writeHead(302, {
            // Redirect Location 설정
            Location : '/',
            // 쿠키 설정 : 이름, 유효기간, Http형식으로만 (js금지), 쿠키를 어떤 경로부터 사용할지. 
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly, path=/`
        });
        // 응답 완료
        res.end();
    }

    // 로그인 되어 있을때 보여줄 화면 = cookie에 name값 저장되었을 경우.
    else if(cookie.name) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 어서오라고!`)
    }

    // 로그인 안된상태라면 cookie
    else {
        try {

        }
        catch (err) {
            
        }
    }
}).listen(8084, () => {
    console.log('8084포트 대기중');
});