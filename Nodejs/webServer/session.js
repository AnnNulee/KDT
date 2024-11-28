const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});



// session 정의!!!!
const session = { // 세션이라는 값을 서버에 만들어놓고, 세션 만들때마다 uniqueInt가 들어가고, 여기에는 유저에 대한 정보들이 밸류로 들어간다. 
    //uniqueInt : {user1 information}, // 세션에서 해당하는 본인의 key(uniqueInt)값을 찾아 전달해줘야한다. 
}



http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  if (req.url.startsWith('/login')) {
    const url = new URL(req.url, 'http://localhost:8084');
    const name = url.searchParams.get('name');
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);




// 유저 key 정의.
    const uniqueInt = Date.now() // 위에서 정의한 session의 키값으로 현재 시간이 들어간다/

// 아까 정의한 session 속의 uniqueInt(유저key)에 해당하는 value(유저 info)값을 먹여준다. 
// session[a] = b 하면 session 오브젝트 내부에 a키가 생성되는 동시에 b 발류값도 대입된다.  
    session[uniqueInt] = { // 세션에서 해당하는 본인의 key(uniqueInt)값을 찾아 전달해줘야한다. 
        name,  // 오브젝트에서 key 와 value값이 같으면 생략가능 (= name: name)
        expires,
    } 



    res.writeHead(302, {
      Location: '/',
// 쿠키에 session= 유저key(uniqueInt = 생성시간)를 적용한다. => 쿠키에 유저의 키가 포함됨. 이때부터 세션 역할 가능
      'Set-Cookie': `session=${uniqueInt}; name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    }); 
    res.end();

    
    // cookies.session : set-Cookie에서 만든 session 값 = uniqueInt값이 적용됨.
    //쿠키에 세션값(uniqueInt)이 있나 확인 + 정해진 expires가 지금보다 이후인지 (유효기간이 남아있는지) 확인
  } else if (cookies.session && session[cookies.session].expires > new Date()) { 

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile(path.join(__dirname, 'cookie.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });