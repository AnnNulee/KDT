<template>
<div>
    <input type="text" v-model="userId"/>
    <button @click="clickEvent">로그에 현재 userId 출력.</button>
    <button @click="changeData">userId data값에 'Teayoon'대입</button>
    <p>data에 적용된 초기 userId값은 'Nulee'</p>
    <p>input value는 v-model로 data.userId와 묶여서 동일 값 => 초기 값은 초기의 data.userId대로 'Nulee'</p>
    <br/>
    <br/>
    <input type="text" v-model.number="num1" /> +
    <input type="text" v-model.number="num2" /> =
    <span>{{ num1 + num2 }}</span>
    <p v-pre> {{중괄호 텍스트 바인딩}} 안에 + 등의 수식은 기능한다. 숫자로 받아주려면 .number값을 줘야함.</p>
    <p>값을 입력해서 뭔가 연산하는 코드를 짜려면 반드시 양방향으로 짜줘야해. 단방향이면 input값이 data로 전달이 안되서 수식이 안먹음. </p>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            userId : "Nulee",
            num1 : 0,
            num2 : 0,
            
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        clickEvent() {
            console.log(this.userId)
        },
        changeData() {
            this.userId = 'Teayoon'
        },

    }
}

</script>