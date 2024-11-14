<template>
<div>
    <h1>나는 PageTitle html내용이다</h1>
    <br />
    <p>msg props</p>
    {{msg}}
    <br />
    <br />
    <p >number props</p>
    {{number}}
    <br />
    <br />
    <p>title props</p>
    {{title}}
</div>
</template>

<script>

export default{ 
    name:'PageTitle',  // 외부에서 참조할 이름?? 
    components:{},
    props : {
            // 상위 컴포넌트(HomeView)에서 하위컴포넌트(HelloWorld)로 전달해준 변수(msg)를 받는 곳. props. 
            // 방법은 상위컴포넌트(HomeView)의 templage에 적용한 하위컴포넌트(HelloWorld) html tag 내부에서 전달할 변수를 선언한다.
            // 하위 컴포넌트는 props 옵션을 사용하여 받을(수신할) 것으로 기대되는 props를 명시적으로 선언해야합니다
            //  template에서 데이터처럼 binding할 수 있다.
        msg : String,

        // props 지정할때 이렇게 구체적으로 포멧을 형성하는게 보통임
        title : {  
            type : String,
            default : "입력값이 없다 (값이 없을 때 나오는 default값)",   //데이터 안들어왔을 때 기본값으로 입력할 수 있다.
            require : true, // 유효성 검사 요구. true 로 했을 때만 데이터 타입에 대한 유효성 검사를 한다.
        },

        number : Number,
    },
    data(){
        return{
            sampleData:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}

</script>

<style scoped>
</style>