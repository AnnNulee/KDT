const User = require('../schemas/user');
const crypto = require("crypto");
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // passport의 인증 전략중 하나인 로컬

dotenv.config();
// 회원가입

// exports.duplicatedUser = async (req, res, next) =>{
//     try {
//         const snsIdDup = req.body.snsId
//         const emailDup = req.body.email
//         const nickDup = req.body.nick
//         const phoneDup = req.body.phone
        
//         if (await User.findOne({snsId: snsIdDup})){
//             res.json({duplicate : true})
//         } else {
//             res.json({duplicate:false})
//         }
        
//     }
// }

exports.join = async (req, res, next) => {
    //schemas/user 보고 어떤 값이 들어와야하는지 확인해봐
    const { snsId, password, email, nick, phone} = req.body; //해당 정보들은 클라이언트가 req 로 보내줄 것.
    console.log(req.body)
    try {
        // 중복검사. snsId, email, phone은 unique=ture 니까,
        const duplicatedUser = await User.findOne({$or:[{snsId}, {email}, {phone}]}) // 해당 요소중 일치하는게 있으면 dplicatedUser에 넣어라
        if (duplicatedUser) { // 이게 있으면, 에러띄워라. 
            return res.json({error:'exist'});
        }
        //비밀번호 암호화(PBKDF2 암호화 방식)
        const salt = process.env.SALT
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex') 
         // (암호화할 값, 솔트, 반복횟수, 생성될 키의 길이, 암호방식 이름), 16진수 문자열로 바꿔주기

         //사용자 데이터 저장.(DB_Create)

         await User.create({
            snsId,
            password : hash,  // 로그인할때도 hash값으로 받아서 암호화된 결과를 비교해야한다.
            phone, 
            nick,
            email,
         });
         return res.redirect('/')

    } catch (err) {
        console.error(err)
        return next(err)
    }
}


// passport에서 사용되는 callback의 인자 : (error(Error|null), user(Object|false), info(Object|undefined)) 

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'snsId', // 사용자 id
    passwordField: 'password', // 사용자 pw
    passReqToCallback : false, //콜백함수에 req 객체 전달 'false'
}, async(snsId, password, done)=>{ // done : 끝났다. next같은 역할. 
    try {
        // 아이디 검증
        const user = await User.findOne({snsId}); // 우리 User 모델에 snsId가 일치해야 우리 user 다.
        console.log(`LStrategyuser : ${user}`);
        if(!user){ // 유저 아니면?
            console.log(`!user : ${user}`);
            return done(null, false, {message: '가입먼저 해'}) 
                // done : 인증 과정의 결과를 반환하는 callback함수
        }
        // 아이디 있는경우 => 비번을 해쉬값으로 변환시켜 검증
        const salt = process.env.SALT
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
        if(user.password !== hash) {
            console.log("비밀번호");
            return done( null, false, {message : '비번이 일치하지 않는다.'})
        }
        done(null, user)
    }catch (err){
        console.error(err)
        return done(err)
    }
}))



//로그인
exports.login = async (req, res, next) => {
    console.log(`loginreq:${req}, loginres:${res}`);
    passport.authenticate('local', (authError, user, info)=> {  //위에 만들어준 로컬 함수에서 '로그인'
        console.log(`인증완료 ${user}`)
        // 'local' : passport 폴더에는 서비스별 각각의 인증전략을 만들어준다. 여기서 우리는 'local' 파일 전략을 쓸거임. 
        // 'local' 은 우리가 위에서 설정해준 LocalStrategy 함수를 실행함.
        // authError: 로그인 인증과정에서 나는 에러 
        // user : 성공시 유저의 정보 
        // info : 로그인하는 과정에서 발생하는 실패의 원인 정보가 메세지로. 
        if (authError) {
            console.error(authError);
            return next(authError)
        }
        // 로그인 안된상태, 실패의 원인 정보가 같이 옴.
        if (!user) { 
            console.log(`loginuser:${user}`);
            return res.json({error:info.message}); //redirect니까 get
        }
        // 로그인 정보 들어온 상태에서, 로그인 에러 나오면 에러표기, 없으면 도메인으로 리다이렉.
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res, next);
}

//로그아웃
exports.logout = (req, res) => {
    req.logout((err) => {
        if(err){
            console.error(err);
            return res.redirect('/?error=logout_failed');
        }
        res.redirect('/');
    })
}