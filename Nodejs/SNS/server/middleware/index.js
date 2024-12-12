// middleware 폴더에는 별개로 정의된 middleware가 있다. (내가 만든 커스텀 middleware)

// 함수정의하는 법. : exports.함수이름
exports.isLoggedIn = (req, res, next) => {
    //로그인 되어있는지 확인
    if (req.isAuthenticated()){ // isAuthenticated : 로그인 돼 있는지 확인  : passport 함수.
        next() //middleware는 실행되면 지혼자 못끝남. 다음 넘어가는 next를 붙여줘야됨.
    } else {
        res.status(403).send('로그인이 필요합니다.')
    }
    
}



exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticateD() {
        next()
    }) else {
        res.status(403).json({message: '이미 로그인한 상태입니다.'})
    }
}