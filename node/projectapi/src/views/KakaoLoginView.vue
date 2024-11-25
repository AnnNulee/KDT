<template>
<div>
    <button @click="kakaoLogin"  class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">카카오 로그인</button>
</div>
</template>

<script>

import { getKakaoToken, getKakaoUserInfo } from '../api/kakao';
import { mapActions, mapGetters } from "vuex";

// 원래 vuex 값은 commit, dispatch 등으로 꺼내 썼는데, 해당 기능을 import 해주면,
// 정의된 state, getters, mutations, actions들을 key값처럼 불러와 사용할 수 있다. 
// 사용법 : ...mapGetters(["해당getters이름"])



export default{ 
    name:'',
    components:{},
    data(){
        return{
            sampleData:''
        };
    },
    computed: {
        ...mapGetters(["user"]), // vuex사용자 상태 가져오기
    },
    setup(){},
    created(){
        // 카카오 api 초기값 세팅 (카카오가 로딩되었지만, 내 자바스크립트 키가 들어가지 않은 상태에, init에 jsKey 제공 )
        if (typeof window.Kakao !== "undefined" && !window.Kakao.isInitialized()){  
            window.Kakao.init("38704b2752e5900f74ea3b9c385e003c")  // javascript key
        }

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("code")) {
            const code = urlParams.get("code");
            this.setKakaoToken(code);
        }
        
    },
    mounted(){},
    unmounted(){},
    methods:{
        ...mapActions(["setUser", "clearUser"]),
        kakaoLogin(){
            window.Kakao.Auth.authorize({   // 카카오에서 제공하는 method
                redirectUri: "http://localhost:8080/login" // 리다이렉트 주소.
            })
        },

        //인가코드(code) 로 엑세스 토큰을 발급받는 함수. 
        async setKakaoToken(code) {
            try{
                const { data } = await getKakaoToken(code); // 코드로 토큰 요청하고, 받은 데이터를 넣는다.
                window.Kakao.Auth.setAccessToken(data.access_token); //data.access_token에 든 엑세스 토큰을 설정함.
                const userInfo = await this.setUserInfo(); // user정보 가져오기
                this.$router.push("/login"); // 로그인 성공 후 이동할 페이지
            } catch (e) {
                console.error(e);
            }
        },

        async setUserInfo() {
            try {
                const res = await getKakaoUserInfo();
                const userInfo = {
                    name : res.kakao_account.profile.nickname,  // 카카오에서 제공해주는 값을 지정하여 key에 대입해줌
                    email: res.kakao_account.email,
                };
                this.setUser(userInfo);
            } catch (e) {
                console.error(e);
            }
        },

        kakaoLogout() {
            window.Kakao.Auth.logout(() => {
                this.clearUser();
            });
        },

    }
};

</script>


