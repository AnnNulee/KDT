const Sequelize = require('sequelize'); 
    // ORM(object-Relational Mapping) 라이브러리. JS object <=(변환)=> SQL DB table 
    // DB 연결생성, Table 정의, query 실행
const User = require('./user');
    // Model -'User' 불러오기
    // sequelize는 db table을 model로 표현 => 각 model에는 테이블 구조, 속성, 관계 등을 정의
const Comment = require('./comment');
    // Model -'Comment' 불러오기



const env = process.env.NODE_ENV || 'development';
    // 현재 실행되는 환경. 

const config = require('../config/config')[env];
    //config : 연결할 DATABASE의 설정. 

// sequelize 인스턴스 생성. 
const sequelize = new Sequelize(config.database, config.username, config.password, config);
                            // database 이름, database 사용자 이름,    비밀번호,     기타설정 ( 호스트, 포트, 로깅)
// db객체 생성
const db = {};
// db객체에 sequelize 인스턴스 추가. 객체를 통해 database연결 관리. 
db.sequelize = sequelize;
db.User = User; //db객체에 테이블 정보 전달. 
db.Comment = Comment; 



User.initiate(sequelize); 


// 데이터베이스 관계설정, associate(1:n 이런거 설정하는거.)
User.associate(db);
Comment.associate(db);




// 다른파일에서 해당 설정을 require 할 수 있도록 db객체 export
module.exports = db;