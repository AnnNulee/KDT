<template>
<div>
    <input type="text" name="" id="" :value="userId"/> 
    <button @click="checkId()">Id_check</button>
    <input type="text" name="" id="" v-model="userId"/> 
    <p> 1) v-bind(생략 가능):value = 속성 바인딩 일방적으로 값을 받아다 쓴다. data 변경 불가. </p>
    <p> 2) v-model = 양방향 바인딩! 실제 data와 동기화. </p> 
    <br/>
    <br/>
    <br/>
    <br/>
    <input type="search" v-model="text1" />
    <button :disabled="text1===''">조회</button>
    <p>1) v-model = 양방향. 실제 data와 동기화.  input value가 text1 data에 동기화되기 때문에 button에 먹인 "text1===''" (text1이 빈칸일 때)에 변동이 생긴다.0.</p>
    <p>2) :value = 속성 바인딩. text1 data에 아무런 변화가 없기 때문에 text1은 계속 빈칸 => button은 항상 disabled. </p>
    <br/>
    <br/>
    <br/>
    <br/>
    <p :style="style0" >style bindnig 해보자. 아래 이미지는 src(경로) data binding 해보자 </p>
    <img :src ="imgSrc" alt="" style="width:500px; height:auto;" />
    <p>{{imgTitle}}</p>
    <p v-pre>문자열 바인딩은 {{중괄호 두개}}로 바인딩, 속성은 :attribute="객체" 로 바인딩. v-pre : vue문법에 해당하는 {{}} 이런거 그냥 택스트로 쓰겠다</p>
    <p v-pre>1) text binding ==> {{data}}</p>
    <p>2) html Binding ==> v-html="data" 속성 위치</p>
    <p>3) attribute Binding ==> v-bind:attribute = "data",</p>
    <p>4) v-model Binding ==> v-model = "data", Script.data와 동기화. </p>


</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            userId:'Taeyoon Han',  
            imgSrc : "ships.png",
            imgTitle: "in ma dream",
            style0 : {
                color : 'blue',
                fontSize : '30px',
            },
            text1 : '',
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        checkId(){
            console.log(this.userId)
        }
    }
}

</script>