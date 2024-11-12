<template>
<div>
    <div class="{text-red: hasError,  active: isActive}">클래스 바인딩 </div>
    <div :class="class2">클래스 바인딩 </div>
    <p> class binding도 가능. style에서 정의해준 class들을 가지고 올라올 수 있다. </p>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            isActive : false,
            hasError : false,
            class2 : ['active', 'text-red'],
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
.text-red {
    color : red;
}
.active {
    background-color: aquamarine;
}

</style>