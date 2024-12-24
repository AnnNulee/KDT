const mongoose = require('mongoose'); // 스키마 정의할거니까 DB연결해야지

// mongoose 모듈을 이용하여, mongoDB를 마치 RDB처럼 사용하기 위해 collection을 table처럼 재정의하는 공간

// 스키마 정의가 없는 MongoDB를 RDB처럼 사용하기 위해 사용하는 mongoose인 만큼
// 스키마로서의 정의를 해준다. (스키마 : DB의 설계도. 정의된 DB를 스키마라고 한다. )
// mongoDB는 컬럼이 없다. 그런데 마치 있는듯이 쓰기 위해 컬럼을 지정해준다. 
// mongoDB는 데이터타입을 설정하지 않는다. 다만 RDB처럼 쓰기 위해 지정해준다. 

const userSchema = new mongoose.Schema({
    snsId : {
        type : String,
        unique : true,
        required : true,
        maxlength : 30,
    },
    password : {
        type : String,
        required : true,
        maxlength : 200,
    },
    email : {
        type : String,
        // required를 빼면 빈값을 허용한다는건데, unique는 null을 허용하지 않는다. 하지만 email은 unique 해야하기때문에 이런 상황에서 쓰는것 : sparse 
        unique : true,
        sparse : true, // null값이 들어와도 unique 허용
        maxlength : 50,
    },
    nick : {
        type : String,
        required : true, 
        unique : true,
        maxlength : 20,
    },
    phone : {
        type : String,
        maxlength: 20, 
    },
    createAt : {
        type : Date,
        default : Date.now(),
    },
    deleteAt : {
        type : Date,
        default : null,
    },
}, {timestamps : false}) // 몽고디비에서는 timestaps하면 만든시간 지우는시간 하는 기능 있다.  이미 그거 우리가 해줬으니까 false로 먼저 넣어줌  
 
const User = mongoose.model('User', userSchema); 
// 몽구스 모듈에 'User'이렇게 정의된 스키마를(userSchema)  MongoDB에서 만들어놓은 ('users')컬렉션에 맵핑
// 없으면 생성. ( 소문자화 + 복수화 해서 만들어준다. User => users
module.exports = User;