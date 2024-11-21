<template>
<div>
    <a id="kakao-login-btn" @click="loginWithKakao">
    <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
        alt="카카오 로그인 버튼" />
    </a>
    
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            sampleData:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        loginWithKakao() {
            Kakao.Auth.authorize({
            redirectUri: 'http://localhost:8080/auth',
            prompt: 'login'  // 저장된 계정으로 로그인 시키지 말고 항상 새로운 로그인창을 띄워라
            });
        },
        
        loginedObj(){
        Kakao.API.request({
            url: '/v1/user/update_profile',
            data: {
                properties: {
                '${CUSTOM_PROPERTY_KEY}': '${CUSTOM_PROPERTY_VALUE}',
                },
            },
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
        });
        },
        
    }
}

</script>





