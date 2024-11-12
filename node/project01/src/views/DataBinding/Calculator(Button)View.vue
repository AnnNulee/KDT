<template>
<div>
    <input type="text" v-model.number="num1"> 
    <div>{{calCode}}</div>
    <input type="text" v-model.number="num2">
    <div>{{result}}</div>

    <button @click="add">add</button>
    <button @click="sub">sub</button>
    <button @click="multiply">multiply</button>
    <button @click="divide">divide</button>

</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            num1 : 0,
            num2 : 0,
            calCode : "",
            result : 0,

        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        add(){
            this.result = this.num1 + this.num2
            this.calCode = "+"
        },
        sub(){
            this.result =  this.num1 - this.num2
            this.calCode = "-"
        },
        multiply(){
            this.result =  this.num1 * this.num2
            this.calCode = "X"
        },
        divide(){
            this.result =  this.num1 / this.num2
            this.calCode = "%"
        },
    }
}

</script>