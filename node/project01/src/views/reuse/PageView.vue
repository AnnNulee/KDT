<template>
<div>
    <PageTitle number="60" msg ="PageView의 template에서, PageTitle을 htmltag로 불러와적용시키고, 해당 태그 안에서 정의해준 변수" />
    <br />
    <br />
    <p>컴포넌츠는 부모자식개념으로 '포함'한다, 된다의 개념이 아니다. 그냥 서로 '연결'되는 개념임. </p>
    <p>화면에서 포함관계로 보이는 것 뿐이지 로직으로는 계위가 있지 않음. </p>
    <br />
    <br />
    <h1>props</h1>
    <p>상위 컴포넌트(HomeView)에서 하위컴포넌트(HelloWorld)로 전달해준 변수(msg)를 받는 곳.</p>
    <p>방법은 상위컴포넌트(HomeView)의 template에 적용한 하위컴포넌트(HelloWorld) html tag 내부에서 전달할 변수를 선언한다.</p>
    <p>하위 컴포넌트는 props 옵션을 사용하여 """"""받을(수신할) 것으로 기대되는 props를 명시적으로 선언""""""해야합니다</p>
    <p>template에서 데이터처럼 binding할 수 있다.</p>

    
    
</div>
</template>

<script>
// import PageTitle from '@/components/flagment/PageTitle.vue' 
// main.js에서 component 설정해주면 import 안해도 됨

// 컴포넌츠는 부모자식개념으로 '포함'한다, 된다의 개념이 아니다. 그냥 서로 '연결'되는 개념임. 
// 화면에서 포함관계로 보이는 것 뿐이지 로직으로는 계위가 있지 않음. 


export default{ 
    name:'',

    /// 이 View에서 활용할 '지역적' 하위 컴포넌츠를 써준다. main.js에서 정해준 component
    components:{ 
        //'PageTitle' : PageTitle       /// 다만 main.js에서 한번 component 설정 해줬기 때문에 이거 또설정해주면 오류난다. 
        
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