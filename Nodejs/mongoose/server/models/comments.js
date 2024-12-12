// mongoose 모듈을 이용하여, mongoDB를 마치 RDB처럼 사용하기 위해 collection을 table처럼 재정의하는 공간
// 추후 라우터에서 불러 쓸 것. 

const mongoose = require('mongoose');
const { Schema } = mongoose;

// mongoose 안의 objectId 타입 가져오기. 관계설정이 필요할 경우 추후 PK처럼 참조해서 사용할 예정. 
const { Types : { ObjectId }} = Schema;

const commentSchema = new Schema({
    comment : {
        type : String,
        required : true,
    },
    createAt: {
        type : Date,
        default : Date.now,
    },

    // 관계설정이 필요한 필드. 외래키를 쓸 수 없다.
    commenter:{
        type : ObjectId,
        required : true,
        ref : 'User', 
        // mongoose의 명명규칙에 따라 mongoDB의 컬렉션에 맵핑할 수 있다. 
        // 우리가 만든 'users' 콜렉션을 참조한다. 
        // 이 파일에서 따로 user를 import 하지 않아도 사용이 가능한 이유는
        // 이 ref 자체에서 user에 연동하여 정보를 끌어온다. 
        // index.js 내부에 connect로 mongoDB로 들어갈 때 
    },

})


// Schema index로 보낼 예정 
// ###mongoose의 명명 규칙###
// MongoDB에서 모델 이름에 s를 붙인 복수형 컬렉션(comments)을 맵핑. 없으면 생성.
// User ==(소문자화 user + 복수화 s )==> users : 단계별로 찾는다. 결국 User, user, users 다 해당됨.
module.exports = mongoose.model('Comment', commentSchema)