<template>
<div>
    <DeepChildVue :deepChildData="UpperChildData" />
</div>
</template>

<script>
import DeepChildVue from '@/components/flagment/DeepChild.vue';

export default{ 
    name:'',
    components:{ DeepChildVue },
    props: {
        UpperChildData : {
            type: String,
            default : '기본문자'
        },
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
    methods:{},
}

</script>