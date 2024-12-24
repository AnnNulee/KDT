const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    img : { 
        type : String, // image 저장 storage는 따로 있고, 우리는 path정보만 저장할 것  
        maxlength : 300,
    },
    content : {
        type : String,
        required : true,
        maxlength : 300,
    },
    likes : {
        type : Number,
        default : 0,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,

    },
    hashtags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Hashtag', 
        // sequelize 에서는 belongs to hasmany 이런식으로 관계설정해줘야하는데
        // mongoose에서는 ref로 연결 해주고, hashtags 값을 배열[] 로 설정하여 여러 값을 받을 수 있도록 한다.
        // 다대 다 관계를 만들고싶으면 똑같이 hashtag 스키마에서도 post 값을 배열로 설정해 여러 값을 받을 수 있도록 하면 된다.   
    }],
}, {
    timestamps : true,
    //collection : 'posts'
});

const Post = mongoose.model('Post', postSchema)
module.exports = Post;