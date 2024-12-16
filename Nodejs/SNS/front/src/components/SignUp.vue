<template>
<div>

    <br>
    <br>
    <div class="timeline">
        <form id="join-form" @submit.prevent="join">
            <div class="input-group">
                <label for="join-snsID">ID</label>
                <input id="join-snsID" type="text" v-model="joinData.snsId" required/>
            </div>
            <div class="input-group">
                <label for="join-password">PASSWORD</label>
                <input id="join-password" type="password" v-model="joinData.password" required/>
            </div>
            <div class="input-group">
                <label for="join-cpw" >PASSWORD confirm</label>
                <input id="join-cpw" type="password" v-model="confirmPassword" required/>
                <p v-if="confirmPassword && confirmPassword !== joinData.password" class="error-msg">(필드 값이 있고 + 비밀번호란과 일치하지 않은경우) : 비밀번호 확인이 일치하지 않습니다. </p> 
            </div>
            <div class="input-group">
                <label for="join-email">E-MAIL</label>
                <input id="join-email" type="email" v-model="joinData.email" required/>
            </div>
            <div class="input-group">
                <label for="join-nick">NICKNAME</label>
                <input id="join-nick" type="text" v-model="joinData.nick" required/>
            </div>
            <div class="input-group">
                <label for="join-phone">PHONE</label>
                <input id="join-phone" type="text" v-model="joinData.phone" required/>
            </div>
            <button id="join-btn" type="submit" class="btn">Join Now!</button>
        </form>
    </div>
</div>
</template>


<script>
import axios from "axios"

export default{ 
    name:'',
    components:{},
    data(){
        return{
            joinData: {
                snsId : '',
                password : '',
                email : '',
                nick : '',
                phone : '',
            },
            confirmPassword : '',

            
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        async join(){
            if (this.joinData.password !== this.confirmPassword) {
                alert("비밀번호가 일치하지 않습니다.")
            }
            try{
                await axios.post("http://localhost:3000/auth/join", this.joinData);
                alert('회원가입이 완료되었습니다.');
                this.$router.push('/') // 리다이렉트
                this.joinData = {
                snsId : '',
                password : '',
                email : '',
                nick : '',
                phone : '',
                },
                this.confirmPassword = '',
                await axios.get("http://localhost:3000/")
            }catch(err) {
                console.error(err);
                if(err.response && err.response.data.error === "exist"){
                    alert('id, email, nick // 이미 존재하는 회원정보 입니다.')
                } else {
                    alert('회원가입중 오류가 생겼습니다.')
                }
            }
        }

        
    }
}

</script>

<style scoped>
.timeline {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
}
.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
.error-msg{
    color : red;
    font-size : 10px;
}
</style>