const Post = require('../schemas/post');
const User = require('../schemas/user');
const Hashtag = require('../schemas/hashtag');



exports.renderProfile = (req, res) => {
    res.render('profile', {title: '내정보 - sns'})
};


exports.renderJoin = (req, res) => {
    res.render('join', {title: '회원가입 - sns'})
};

//도메인으로 갔을때 보여줄 화면 :
exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.find().populate({path:'user', select:'snsId nick'})
        //populate는 MongoDB와 Mongoose에서 다른 컬렉션의 데이터를 참조하여 가져오는 기능을 제공
        //MongoDB는 일반적으로 관계형 데이터베이스와는 달리 참조(reference)를 사용해 데이터를 저장
        // populate는 이런 참조 필드를 실제 데이터로 대체하여, 다른 컬렉션의 데이터를 쉽게 가져올 수 있도록 도와줍니다.
        // select에는 필드를 뽑아온다.
        .sort({createAt : -1});

        res.json({title:'SNS-Main', twits:posts})
    }catch(err) {
        console.error(err);
        next(err);
    }
}