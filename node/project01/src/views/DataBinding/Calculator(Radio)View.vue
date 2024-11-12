<template>
<div>
    <input type="text" v-model.number="num1"> 
    <div>{{calCode}}</div>
    <input type="text" v-model.number="num2">
    <div>{{result}}</div>


    <input type="radio" value="+" id="+" v-model="calCode"/>
    <label for="+">add</label>
    <input type="radio" value="-" id="-" v-model="calCode"/>
    <label for="-">sub</label>
    <input type="radio" value="X" id="*" v-model="calCode"/>
    <label for="*">multiply</label>
    <input type="radio" value="%" id="/" v-model="calCode"/>
    <label for="/">divide</label>
    <button @click="calculate">Go</button>
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
        calculate(){
            switch(this.calCode){
        
            case '+':
            this.result = this.num1 + this.num2;
                break;

            case '-':
            this.result = this.num1 - this.num2;
                break;

            case 'X':
            this.result = this.num1 * this.num2;
                break;

            case '%':
            this.result = this.num1 / this.num2;
                break;
        
            }
        }
    }
}

</script>