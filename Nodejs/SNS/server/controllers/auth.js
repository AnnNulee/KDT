const User = require('../schemas/user');
const crypto = require("crypto");
const dotenv = require('dotenv');
dotenv.config();


// 회원가입

exports.join = async (req, res, next) => {
    //schemas/user 보고 어떤 값이 들어와야하는지 확인해봐
    const { snsId, password, email, nick, phone} = req.body; //해당 정보들은 클라이언트가 req 로 보내줄 것.
    try {
        // 중복검사. snsId, email, phone은 unique=ture 니까,
        const duplicatedUser = await User.findOne({$or:[{snsId}, {email}, {phone}]}) // 해당 요소중 일치하는게 있으면 dplicatedUser에 넣어라
        if (duplicatedUser) { // 이게 있으면, 에러띄워라. 
            return res.redirect('/join?error=exist');
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

//로그인
exports.login = async (req, res, next) => {
    passport.authenticate('local', (authError, user, info)=> { 
        // authError: 로그인 인증과정에서 나는 에러 
        // user : 성공시 유저의 정보 
        // info : 로그인하는 과정에서 발생하는 실패의 원인 정보가 메세지로. 
        if (authError) {
            console.error(authError);
            return next(authError)
        }
        // 로그인 안된상태, 실패의 원인 정보가 같이 옴.
        if (!user) { 
            return res.redirect(`/?error=${info.message}`)
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
            return res.redirect('/?error=logout_failed')
        }
        res.redirect('/');
    })
}