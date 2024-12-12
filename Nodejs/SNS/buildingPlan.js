const { Router } = require("express")
const { post } = require("./server/routes/pageRouter")
const { create } = require("./server/schemas/user")

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
