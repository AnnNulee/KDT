<template>
<div>
    <button @click="clickEvent">userId 로그출력</button>
    <button @click="changeUserId">useId 'taeyoon'으로 변경</button>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            userId : 'nulee',
            num1 : 0,
            num2 : 0,
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        clickEvent(){
            console.log(this.userId)
        },
        changeUserId(){
            this.userId = 'teayoon'  
        },

    }
}

</script>