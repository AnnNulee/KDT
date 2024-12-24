const { Router } = require("express")
const { post } = require("./server/routes/pageRouter")
const { create } = require("./server/schemas/user")
const { isNotLoggedIn, isLoggedIn } = require("./server/middleware")
const { join } = require("path")
const { request } = require("http")
const { renderMain } = require("./server/controllers/page")
const { login } = require("./server/controllers/auth")
const User = require("./server/schemas/user")
const { afterUploadImage, Uploadpost, updatePost } = require("./server/controllers/post")

1. front / back 을 나눌지, 같이 할지
=> api Server를 운용하겠다.Server를

2. Front : html, css, js => Vue.js : front side rendering 
-> Single File Component => req가 줄어든다. => server에 부담이 적음 => 더 빠른 랜더링 => 사용자 경험 개선

vue를 쓴 이유? 조금 더 구조적으로 관리 가능, 유지보수 측면에서 효율적이다. " 우리 프로젝트에 더 적합하다고 판단했습니다."


3. Backend : Node.js
node : singleThread,  => 가볍다 + 비동기적 수행 => I/O 처리를 빠르게 수행한다. => 간단한 I/O가 많은 "우리 프로젝트에 더 적합하다고 판단했습니다. " 

4. DataBase :
MongoDB => 비정형데이터, 자유도가 높다 =>  비정형데이터(굳이 테이블형식 아니어도 됨)를 저장하고 관리 할때 좋다.  => 이미지를 쓰는  "우리 프로젝트에 더 적합하다고 판단했습니다."
SQL DB = > user의 정보 데이터를 기반한 관계형성때문에 RDB를 사용한다. 


-------------------------------------------------------------------------------

SNS 


------------------------------------------------------------------------------
라우터 구조

1. app.js 
    1. localhost:3000 '/' => routes/pageRouter
        - localhost:3000'/' => controller : renderMain
        - localhost:3000'/join' => middleware : isNotLoggedIn / controller : renderProfile  // 회원가입은 auth 아니야?
        - localhost:3000'/profile' => middleware : isLoggedIn / controller : renderProfile
        * controllers/page
            - renderMain
            - renderProfile
            - renderJoin

    2. localhost:3000 '/auth' => routes/authRouter
        - localhost:3000/auth'/join' => middleware : isNotLoggedIn / controller : join 
        - localhost:3000/auth'/login' => middleware : isNotLoggedIn / controller : login
        - localhost:3000/auth'/logout' => middleware : isLoggedIn / controller : logout
        * controllers/auth
            - join
                1.  Unique값 (snsId, email, phone) 중복비교
                    - 입력받은 데이터(req.body)와 일치하는 User의 Document가 있다면(findOne), 값을 저장 
                    - (1)의 값이 존재할경우, 에러띄우기
                    - (1)의 값이 존재하지 않을 경우(값이 중복되지 않는 경우) 비밀번호 암호화
                2.  비밀번호 crypto hash화 (암호화)
                    - salt값 주기
                    - req.body.password를 crypto함수로 hash 생성해서 값 저장.
                3. User 콜렉션에 Document 하나 생성
                    - 입력받은 req.body.key 값을 document.key에 대입하기
                    - await User.create({document.key : req.body.key})
                        -password key는 (2)에서 생성한 hash값을 대입.
                        * document 내에는 실제 password값이 아닌 password 의 hash값이 저장됨.
                        * 로그인 시에도 hash화 하여 비교할 예정
                    - 도메인으로 redir
            - login
                1. req(loginData) 값을 로컬인증전략인 authenticate(passport-local.Strategy)함수에 적용.
                    - LocalStrategy
                    * passport에서는 인증과정의 결과를 반환하는 callback함수인 done(error, user, info)를 사용한다.
                        1. 아이디 검증
                            - 전달받은 req.body의 snsId가 User의 snsId와 일치하는 도큐먼트가 있는경우, 해당 '도큐먼트' 저장
                            - (1)값이 존재하지 않을 경우(아이디가 없으면), done(에러null, 유저정보false, 실패메세지) return.
                            - (1)값이 존재하는 경우(아이디가 있으면), 전달받은 req.body의 password를 crypto-hash화. 
                        2. 비밀번호 검증
                            - 전달받은 req.body의 password를 hash화
                            - hash화된 password를 User의 password와 일치하는 도큐먼트 있는지 비교
                            - 일치하는 도큐먼트가 "없을" 경우, done으로 실패메세지
                            - 일치하는 도큐먼트가 "있을" 경우, done으로 User data 반환
                
                2.  함수에서 전달받은 데이터: (인증에러, 로그인정보, 실패메세지)
                    - 로그인정보가 정상적으로 들어올 경우 : 인증 완료.
                    - 인증에러가 있을 경우 : 인증에러 전송
                    - 로그인이 안 된 상태에서 실패정보가 있을 경우 : 실패 메세지 반환(json)
                    - 로그인 정보가 들어왔지만 에러도 같이 오는 경우 : 에러 전송, 메인으로 redir
            - logout
                1. '.logout' 함수로 로그 아웃. 


    3. localhost:3000 '/post' => routes/postRouter
        - localhost:3000/post'/img' => middleware : isLoggedIn, upload.single('img') / controller : afterUploadImage
        - localhost:3000/post'/' => middleware : isLoggedIn, upload2.none() / controller : uploadPost
        - localhost:3000/post'/update/:postId' => middleware : isLoggedIn, upload2.none() / controller : updatePost
        - localhost:3000/post'/delete/:postId' => middleware : isLoggedIn / controller : deletePost
        * controller/post
            -afterUploadImage
                1. 이미지의 path정보 전송. / res.json({url : `img/${req.file.filename}`})  
            -uploadPost
                1. POST schema에 새 document 정의. 
                    - Post.create({content : req.body.content, img : req.body,url, user : req.user_id})
                2. content에서 hashtag 구분하기
                    - req.body.content.match(정규화코드)
                    - 매칭되는 모든 부분을 '배열'로 반환.
                    - 매칭값이 없는 경우 'null'값
                3. 해쉬태그가 있을 경우 
                    - hashtags 배열에 map 적용
                        * map : 내부요소 하나하나에 함수 적용 후 배열로 반환.
                    -


            -updatePost
            -deletePost


    -middleware
        * isLoggedIn : req.isAuthenticated
        * isNotLoggedIn : !req.isAuthenticated
    
-------------------------------------------------------------------------------

1일차. 

-Node 
    => sequilize-cli로 구조 만들기
    => express, cors, mongoose, cookie-parser => dependencies
    => nodemon => devDependencies
    => app.js 만들기 (서버 파일)
    => server/routes/pageRouter.js => router 만들기

-Vue 
    => vue-cli로 구조 만들기
    => axios 설치 (요청 보내기 기능)
    => aboutView.vue에 axios.get으로 요청보내 노드 서버(pageRouter.js)와 연결상태 확인. 


-------------------------------------------------------------------------------


2일차

-Node
    => 라우터 분리 - controller 
    => model 정의 : MongoDB-Mongoose 에서는 'schema' 로 정의. 원래 schema가 정의되지 않는 MongoDB에 mongoose를 통해 schema를 정의해준다.
       *정의할 schema : post, user, hashtag
    => 로그인 기능 구현 

-schema
    => users 
        * snsID
        * PW
        * EMAIL
        * Phone
        * nickname
        * create_at
        * delete_at // 탈퇴하고 60일의 유예기간 후 삭제
        + 카카오 API 연동

    => post 
        * Image
        * content
        * create_at
        * likes
            * users-snsId
            * hashtag
    => hashtag
        * title 
        // * post : 와 다대 다 관계이기 때문에 post를 연동하고싶겠지만, 그냥 hastag로 검색하면 된다. 
    

-Router
    => 기능
        * 로그인
        * 포스트 조회 (Main)
        * 포스트 생성
        * 포스트 수정
        * 포스트 삭제 
        * 해쉬태그 - 포스트 조회
        * 특정 유저 - 포스트 조회
        * 유저 정보
    
    => Page Router
        * 포스트 조회 (Main)
    => Post Router
        * 포스트 수정
        * 포스트 삭제 
        * User 포스트 조회
    => User Router
        * User 정보
    => Auth Router
        * login

==> 순서 정하기 
    1. Login 만들기
        * Post가 존재하기 위해서는 User가 해당 글을 작성해야한다. => User 먼저. => login기능 먼저 생성. \
        * passport 미들웨어 : 다양한 인증처리를 쉽게 해줌. 유명한 인증전략 방법론을 몇 가지 가지고 있음
        
        1-1. 인증 Strategies
            * 로그인 id, pw 입력하기
            * 로그인 id 와 db의 id와 일치하면, 



-------------------------------------------------------

3일차

-postman : 무료, 사용 간단. 라이트. 
    * 서버를 개발하는 중, 프론트가 없을 때는 post요청이 잘 이루어지는지 확인할 수 없다. 이럴 때 요청을 받아 결과를 보여주는 프로그램

1.passport & passport-local 설치
    * passport : 인증
    * passport-local : passport의 인증전략중 하나
2. middleware 
    * isNotLoggedIn : 로그인 안된 상태면 true
    * isLoggedIn : 로그인 된 상태면 true
3. Auth Router 만들기
    * '/join', isNotLoggedIn, join
    * '/login', isNotLoggedIn, login
    * '/logout', isLoggedIn, logout
4. controller
    * join : 회원가입 (post)=> 사용자로부터 회원 정보를 입력받아 해당 정보를 MongoDB에 저장
    * login : 로그인 (post) => 사용자로부터 로그인 정보를 받아 MongoDB에 있는 데이터와 비교, 로그인 실행
    * logout : 로그아웃 (get)=> 요청이 들어오면 로그아웃 상태로 변환
5. LocalStrategy
    (1) 사용자로부터 받은 로그인 정보 값을 DB에 있는 정보와 비교. 
    (2) 회원가입에서 사용한 암호화 규칙을 적용해서 DB에 저장된 암호와 비교 
    (3) user 정보를 다음 미들웨어로 전달. 
6. serialize & deserialize 만들기
    * serialize : 사용자 정보를 세션에 저장
    * deserialize : 사용자 정보를 복원

--------------------------------------------------------

-게시판 기능
    * 사진 올리기
    * 게시글 올리기
    * 게시글 조회
    * 게시글 삭제
    * 게시글 수정
        - content, img, hashtag 수정 

-front 개발

* joincomponent
    -method 
        1. Post 요청 ( 회원 정보를 가지고 회원가입요청 request)
        2. 

