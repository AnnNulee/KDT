const Sequelize = require('sequelize');
<<<<<<< HEAD

//모델 불러오기
const User = require("./Users"); 
const Comment = require("./Comments")


=======
const User = require("./Users"); // User 모델 불러오기
const Comment = require("./Comments")

>>>>>>> 6785f83a141a2fa3487f64f379f172a60778904f
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User; // db에 테이블 정보 전달
db.Comment = Comment;

<<<<<<< HEAD
// 해당 User를 실행해서 초기화 시키는 작업
User.initiate(sequelize); 
=======
User.initiate(sequelize); // 해당 User를 실행해서 초기화 시키는 작업
>>>>>>> 6785f83a141a2fa3487f64f379f172a60778904f
Comment.initiate(sequelize);

// 데이터베이스 관계 설정
User.associate(db);
Comment.associate(db);

module.exports = db;