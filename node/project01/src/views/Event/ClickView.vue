<template>
<div>
    <p>Count : {{num}}</p>
    <button v-on:click="addCount">Add</button>
    <button @click="subCount">Sub</button>

    <p>v-on:click=""  =줄여서=> @click=""</p>
    <p></p>
    <p></p>
    <p></p>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            num : 0, 
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        addCount(){
            this.num += 1;
        },
        subCount(){
            this.num -= 1;
        },
    }
}

</script>