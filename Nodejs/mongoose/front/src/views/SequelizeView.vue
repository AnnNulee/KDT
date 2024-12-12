<template>
<div>
    <div>
      <form @submit.prevent="postUser">
        <fieldset>
          <legend>사용자 등록</legend>
          <div><input v-model="newUser.name" type="text" placeholder="이름"></div>
          <div><input v-model="newUser.age" type="number" placeholder="나이"></div>
          <div><input v-model="newUser.married" type="checkbox" id="married"><label for="married">결혼 여부</label></div>
          <button type="submit">등록</button>
        </fieldset>
      </form>
    </div>
    <table>
        <thead>
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>나이</th>
                <th>결혼여부</th>
            </tr>  
        </thead>
        <tbody>
            <tr v-for="user in users" :key ="user._id">
                <th>{{ user._id }}</th>
                <th>{{ user.name }}</th>
                <th>{{ user.age }}</th>
                <th>{{ user.married ? "기혼" : "미혼"}}</th>
            </tr>
        </tbody>
    </table>
    <br>
   
    <div>
        <form @submit.prevent="postComments">
            <fieldset>
                <legend>댓글등록 </legend>
                <div><input v-model="searchName" type="text" placeholder="사용자 이름"></div>
                <div><input v-model="newComment.comment" type="text" placeholder="댓글"></div>
                <button type="submit">등록</button>
            </fieldset>
        </form>
    </div>
    <div>
        <form @submit.prevent="searchComment(searchUser)">
            <fieldset>
                <legend>댓글검색 </legend>
                <div><input v-model="searchUser" type="text" placeholder="사용자 아이디"></div>
                <button type="submit" >검색</button>
            </fieldset>
        </form>
    </div>
     <table>
        <thead>
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>댓글</th>
                <th> </th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="comment in dbComments" :key="comment._id">
                <th>{{ comment._id}}</th>
                <th>{{ users.find(user => user._id === comment.commenter)?.name || "" }}</th>
                <th>{{ comment.comment }}</th>
                <th><button @click="patchComment(comment._id)">수정</button></th>
                <th><button @click="deleteComment(comment._id)">삭제</button></th>
            </tr>
        </tbody>
        
    </table>

</div>
</template>

<script>
import axios from 'axios'

export default{ 
    name:'',
    components:{},
    data(){
        return{
            // for문을 돌려야하기때문에 오브젝트 요소를 배열로 감싸준다. 오브젝트형식으로 만들면 내부의 key값을 기준으로 반복을 하게 된다고!!!
            users: [], 
            dbComments :[],

            // 사용자 등록 data 을 받아 서버에 Post해주는 데이터
            newUser : {
                name : '',
                age : 0,
                married : false,
            },

            searchName:'',
            // 서버에서 데이터를 받아 '댓글등록'form에 쏴주는 공간.
            // 여기서 보낸 요청이 server 라우터 .post함수에서 req.body.key-value로 사용됨 
            newComment : {
                userid : '',
                comment : '',
            }, 
            searchUser : '',
        };
    },
    setup(){}, // components, watch, computed 등을 로드한다. 
    created(){
        
    },
    mounted(){
        this.getUsers() 
        this.getComments()
    },
    unmounted(){},
    methods:{
        // 1. 사용자등록 POST
        async postUser() {
            // 내용 안들어오면 alert로 내용채우라고 겁박하기
            if(!this.newUser.name || !this.newUser.age) {
                alert("이름과 나이를 입력하셔야 합니다. ");
                // 입력값이 없을 경우에는, try를 들어가면 안된다. 바로 함수를 끝내야하기 때문에 빈 return으로 흐름을 끊어준다. 
                return ; 
            }
            try{
                // 등록값이 추가된 새로운 data를 보여줘야한다. 
                // 방법 1. get으로 새로 가져오기.
                        // req 주소와 posting data 전달.
                    // const response = await axios.POST('http://localhost:3000/user', this.newUser );
                        // 사용자 목록 업데이트
                    // this.users = response.data
                        // 사용자 등록창 초기화
                    // this.newUser = {name : '', age : null, married : false}

                // 방법 2. getUsers한번 더 돌리기
                await axios.post('http://localhost:3000/user', this.newUser );
                this.getUsers();
                this.newUser = {name : '', age : null, married : false};

                // 방법 1과 2의 차이 : 
                // 방법 1은 response를 위해 서버 코드의 res.end 코드를 보충해줘야함 
                // 방법 2는 getUsers의 axios.get 까지 해서 요청 2개. 
            } catch(err) {
                console.error(err);
            }
        },


        // 2. 사용자 조회 GET
        async getUsers() {
            try {
                // 도메인 요청, 돌아오는 response 잡기
                const response = await axios.get('http://localhost:3000/user');
                // 받은 data, this.users에 저장
                this.users = response.data ;
                console.log(this.users) //response된 데이터 확인 
            } catch(err) {
                console.error(err)
            }
        },


        // 3. 댓글 등록 POST
        async postComments(){
            if(!this.searchName || !this.newComment.comment){
                alert("이름과 댓글 내용을 쓰세요");
                console.log("alert")
                return ; 
            }

                // 이름으로 id 찾는 방법 1. front에서 id 골라서 보내기
            // try{

            //     // 입력한 이름(searchName에 해당하는 document의 userid를 뽑아 commenter로 전달. 
            //     // users 에 전체 값이 들어오니까, users에서 전달받는다. 
                
            //     const user = this.users.find(user=> user.name === this.searchName)._id 
            //     // 입력받은 searchName과 users의 name값이 일치하는 도큐먼트의, 그 '_id'를 가져와라.

            //     console.log(`${user}_id 임`)

            //     this.newComment.userid=user 
            //     // req로 전달할 userid를, serchName이 일치하는 도큐먼트의 objectId (_id) 로 대입하여 전달하라.
            //     console.log(this.newComment)

            //     await axios.post('http://localhost:3000/comment', this.newComment);
            //     this.getComments();
            //     this.searchName = '',
            //     this.newComment = {userid : '', comment : ''} 

            // }

                // 이름으로 id 찾는 방법 2. front에서 name 보내고 server에서 id찾기.
            try{
                this.newComment.userid = this.searchName //id 대신 이름 전달하기
                await axios.post('http://localhost:3000/comment', this.newComment);
                this.getComments()
                this.newComment = {userid : '', comment : ''} 

            } catch (err) {
                console.error(err);
            }
        },


        // 4. 댓글 조회 GET
        async getComments(){
            try { 
                const response = await axios.get('http://localhost:3000/comment');
                this.dbComments = response.data;
            } catch(err){
                console.error(err);
            }
        },
            // 4-1. 댓글 수정 PATCH
        async patchComment(commentId){
            const newText = prompt("댓글 바꿔봐");
            if (!newText) {
                alert("댓글 바꿀내용 써야 바뀔거 아냐");
                return;
            }
            try {
                await axios.patch(`http://localhost:3000/comment/${commentId}`, {text: newText});
                //서버단, route에서는 params로 commentId 찾고, req.body.text 바디파싱으로 newText 땡겨온다. 
                this.getComments();
            }
            catch(err){
                console.error(err);
            }
        },

            // 4-2. 댓글 삭제 DELETE
        async deleteComment(commentId){
            try{
                await axios.delete(`http://localhost:3000/comment/${commentId}`);
                this.getComments();
            }
            catch(err) {
                console.error(err);
            }
        },

        // 5. 특정 ID comment 조회
        async searchComment(userid){
            try {
                const response = await axios.get(`http://localhost:3000/user/${userid}/comments`)
                // params는 어떻게 전달되는가? : 포트 뒤에있는 user, userid, comments 가 각각 key가 된다. 
                // { user : "이름", userid : {userid}, comments : "어쩌고"}
                this.dbComments = response.data;
                this.searchUser= '';
            } catch(err){
                console.error(err);
            }
        }
    }
}

</script>

<style>
table {
  border: 1px solid black;
  border-collapse: collapse;
}
table th,
table td {
  border: 1px solid black;
  padding: 5px;
}
</style>