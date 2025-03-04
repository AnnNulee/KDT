// app.js는 Express 서버 자체.
// 서버를 만들고, req를 받아 라우터로 전달하고, 라우터는 이를 처리하여 front에 res를 전송.
// 응답은 res.send() 또는 res.json() 등으로 클라이언트에 전달. 
// 클라이언트 측에서는 Axios같은 HTTP클라이언트를 사용하여 서버로부터 받은 응답을 처리. 
// middleware는 req를 처리하거나 res를 수정하여 전송

// express의 라우터는 기본적으로 세 개의 인자인 (req, res, next)를 받는다.
    // req : 요청
    // res : 서버에서 클라이언트에게 보낼 데이터
    // next : 요청 처리 후 다른 미들웨어나 라우터로 제어를 넘기는 함수
// express에서 에러처리 미들웨어는 4개의 인자(err, req, res, next)를 받는다. 

// 이 미들웨어는 에러 발생 시 에러 객체(err)를 처리하며, 에러가 발생하면 next(err)를 호출하여 에러 처리 미들웨어로 제어를 넘김. 