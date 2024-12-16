<template>
<div class="container">
    <form id="login-form" @submit.prevent="login">
        <div class="input-group">
            <label for="login-snsId">ID</label>
            <input id="login-snsID" type="text" v-model="loginData.snsId" required/>
        </div>
        <div class="input-group">
            <label for="login-password">PASSWORD</label>
            <input id="login-password" type="password" v-model="loginData.password" required/>
        </div>
        <router-link to="/join" class="btn">회원가입</router-link>
        <button id="login-btn" type="submit" class="btn">login</button>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default{ 
    name:'',
    components:{},
    data(){
        return{
            loginData:{
                snsId: '',
                password: '',
            }
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        async login(){
            console.log(this.loginData)
            const result = await axios.post("http://localhost:3000/auth/login", this.loginData, { withCredentials: true});
            console.log(result)
            alert("로그인 되었습니다.");
            this.$router.push('/') // 리다이렉트
            this.loginData = {
            snsId: '',
            password: '',
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