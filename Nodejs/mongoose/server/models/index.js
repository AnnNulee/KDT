// mongoose로 실제 MongoDB에 연결해준다. 
// mongoose는 MongoDB 내에 있는 컬렉션들을 자동으로 끌어온다. ==> import가 필요 없다. 

// npx sequelize init 설치하면 자동생성
// MongoDB의 기본적인 설정  : MongoDB 연결해주기.
// 이 파일은 app.js에서 실행된다.  app.js에서 몽구스가 실행될 수 있게끔 설정. 
const mongoose = require('mongoose');


// connect method 생성
// 배포가 완료된상태(production)가 아니면(text, develop) mongoose에서 디버그 로깅을 사용. 
// production(배포) 단계가 아닐경우에만 debug(MongoDB에서 어떤 쿼리들을 쓰는지 모두 로깅하여 체크)하겠다.
const connect = () => {
  if (process.env.NODE_ENV !== 'production') { 
    mongoose.set('debug', true) // MongoDB에서 어떤 쿼리들을 쓰는지 모두 로깅해줌
  }
  //MongoDB 연결. 'mongodb://아이디:비밀번호@서버/admin'
  // 여기서 MongoDB를 연결하면 내부에 있는 컬랙션을 자동으로 끌어온다. ==> 따로 import 해주지 않아도 연동됨. 
  // mongoDB을 처음 실행하면 admin, local, config 가 자동으로 생성. 그리고 각각 역할이 있다. 
  // admin : 관리자 기능. 실제 DB가 아니다. 
  mongoose.connect('mongodb://NULEE:1234@localhost:27017/admin', {
    dbName: 'nodejs',
    useNewUrlParser : true, // MongoDB에서 사용하는 urlparser, 이거 안하면 최신 MongoDB랑 연결 안됨.
  }).then(() => {
    console.log('MongoDB Connected')
  }).catch((err) => {
    console.log('######에러 발생######')
    console.error(err)
  }) 
}

// 에러나면 에러 났다고 알려줘
mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connect Fail', err)
});

// 연결이 끊기면 재연결 시도.
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected and retry Connection')
  connect(); // 다시 커넥트 실행
})


// app.js에서 실행시킬 예정
module.exports = connect;