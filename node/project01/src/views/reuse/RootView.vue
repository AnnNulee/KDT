<template>
<div>
    <!-- <UpperChildVue :UpperChildData="새로운문자"/> -->
    <!-- <DeepChildVue :deepChildData="새로운문자" /> -->
    <UpperChildVue />
    <p>데이터를 주려는 컴포넌트와, 받으려는 자식컴포넌트 사이에 여러개의 컴포넌트가 끼어있을 때</p>
    <p>그 단계를 건너서 데이터를 전송해주기 위해서는 모든 단계에서 props를 설정해줄 수 있다. </p>
    <h1>근데 provide / inject 쓰면 됨 </h1>
    <p>데이터를 전송하려는 부모컴포넌트에서 자식 컴포넌트 import해주고 provide api (method형식)로 데이터를 쏴주면,</p>
    <p>최종 목적지인 자식 컴포넌트에서 inject api로 데이터를 받아 표시해준다. </p>
</div>
</template>

<script>
import UpperChildVue from '@/components/flagment/UpperChild.vue';
import DeepChildVue from '@/components/flagment/DeepChild.vue';

export default{ 
    name:'',
    components:{ UpperChildVue, DeepChildVue },

    //provide API. method 형식
    provide() {
        return {
            deepChildData : "새로운문자"
        }
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
