// mongoose 모듈을 이용하여, mongoDB를 마치 RDB처럼 사용하기 위해 collection을 table처럼 재정의하는 공간

// 스키마 정의가 없는 MongoDB를 RDB처럼 사용하기 위해 사용하는 mongoose인 만큼
// 스키마로서의 정의를 해준다. (스키마 : DB의 설계도. 정의된 DB를 스키마라고 한다. )
// mongoDB는 컬럼이 없다. 그런데 마치 있는듯이 쓰기 위해 컬럼을 지정해준다. 
// mongoDB는 데이터타입을 설정하지 않는다. 다만 RDB처럼 쓰기 위해 지정해준다. 

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type : String,
        required : true,
        unique : true,
    },
    age : {
        type : Number,
        required : true,
    },
    merried : {
        type : Boolean,
        default : false,
    },
    comment : {
        type : String
    },
    createAt: {
        type : Date,
        default : Date.now, 
    },
})

// // MongoDB 콜렉션 지정매핑
// const postSchema = new Schema({
//     creater : String,
//     post : String,
// }, {collection : 'post_schema'}) // MongoDB 콜렉션 지정매핑


// 몽구스 모듈에 'User'이렇게 정의된 스키마를(userSchema)  MongoDB에서 만들어놓은 ('users')컬렉션에 맵핑
// 없으면 생성. ( 소문자화 + 복수화 해서 만들어준다. User => users)
module.exports = mongoose.model('User', userSchema)
// module.exports = mongoose.model('Post', postSchema)