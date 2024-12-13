// 게시글과 이미지 업로드 
// model 임포트
const Post = require('../schemas/post');
const Hashtag = require('../schemas/hashtag');


// img 를 업로드하면 해당 url을 클라이언트로 전송.
// 서버로 img가 저장이 되면 그 path값을 클라이언트에게 전송. 
// 그것을 조회할때 path값을 요청한다. 
    // 이미지를 서버에 저장하기 전에, 어디에 저장하는지 path값을 먼저 뽑아주고, img 파일은 해당 경로의 storage에 저장된다.
    // 그리고 그 path값을 클라이언트에 전달해준다.
    // 그럼 클라이언트가, 받은 path값을 포함한 나머지 schemas/post에 저장할 data들과 함게 post db에 POST 된다. 

exports.afterUploadImage = (req, res) => {
    res.json({url :`img/${req.file.filename}`}) // 이미지의 path정보. 클라이언트에 전달해줄거임 
}


exports.Uploadpost = async( req, res, next) => {
    try {
        const post = await Post.create({ // POST 스키마 내부에 document 하나를 정의해줌 
            content : req.body.content,
            img : req.body.url,
            user: req.user._id, 
            // req 안에 user값을 준다. req안에는 원래 user필드값이 없는데, 우리가 이걸 만들어줄거임. 
        });
        // content 안에 hashtag도 써주니까 그 안에서 #hashtag를 찾아준다.
        const hashtags = req.body.content.match(/#[^\#]*/g) 
        // match: 매칭되는 모든 부분을 찾아 배열로 반환합니다. 매칭되는 항목이 없으면 null을 반환합니다.
        // #으로 시작하고, ^공백빼고? #전까지 g뒤져서 해준다.
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(async (tag) => { // map 하면 내부 요소(지금은 포스트에 작성된 해쉬태그들) 하나하나에 함수 적용 후 그거 묶어서 배열로 반환.
                    // 해쉬테그 내부 타이틀 추출
                    const title = tag.slice(1).toLowerCase(); // 배열의 2번째 값(1번 인덱스값) 을 추출하여 소문자로 변환
                    // 해쉬태그 중복방지
                        // 들어온 값이 기존 해쉬태그 스키마에 있냐? => 있으면 hash에 대입.
                    let hash = await Hashtag.findOne({title})   
                        // 해쉬태그 없으면 만들어
                    if (!hash) { 
                        hash = await Hashtag.create({title}) // 만들어
                    }
                    return hash
                })
            );
            post.hashtags = result.map((hash) => hash._id);
            await post.save();
        }
        res.redirect('/')
    }catch (err) {
        console.error(err);
        next(err);
    }
}


