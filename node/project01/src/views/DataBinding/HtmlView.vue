<template>
<div>
    <div v-html="htmlString"></div>
    <div v-html="htmlString" :style="style1"></div>
    <button @click="style1.color = 'red'"> 양방향 바인딩이 아니라, 값을 직접 바꾸어 해당 data가 'red'로 바뀐다.  </button>
    <button @click="colors">methods : 해당 color data 로그로 표시해주기</button>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            htmlString:'<h1 style="color:blue;">Peter Kim</h1><p><b>Hello Welcome to my site</b></p>',  
            //html을 binding할 때는, div tag 안에 v-html = "htmlString" 이라고 쓰고, {{중괄호 태그}}를 쓰지 않는다.
            style1 : {
                color : 'green',   // tem에서도 style1.color 로 속성 찍어주고 값 바꿔줄 수 있다. 
                fontSize : '30px',
            },
        };
    },
    setup(){},
    created(){    },
    mounted(){},
    unmounted(){},
    methods:{
        colors() {
            console.log(this.style1.color)
        }
    }
}

</script>