<template>
<div>
    <p>{{ userName }}</p>
    <p>{{ msg }}</p>
</div>
</template>

<script>

// vue에서는 function 안쓰고 이름() 하면 함수 선언이 된다.

export default{ 
    name:'',
    components:{},
    data(){
        return{
            userName : '누리',
            msg : "data에 정의된 msg키의 value값"
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}

</script>