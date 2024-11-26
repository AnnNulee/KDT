<template>
<div>
    <div v-html="htmlString"></div>
    <div v-html="htmlString" :style="style1"></div>
    <button @click="style1.color ='red'"> 이벤트 클릭으로 data를 직접 'color : red'로 바꾼다고</button>
    <button @click="changeColor">이벤트 클릭에 함수를 심어서 data값을 로그로 찍는다고. </button>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            htmlString: '<h1 style="color:blue;">Peter Kim</h1><p><b>Hello Welcome to my site</b></p>',
            style1 : {
                color : 'green',
                fontSize : '30px', 
            },
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        changeColor() {
            console.log(this.style1.color)
        }
    }
}

</script>