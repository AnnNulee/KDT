<template>
<div>
    <input type="text" v-model.number="num1"> 
    <div>{{calCode}}</div>
    <input type="text" v-model.number="num2">
    <br />
    <br />
    <input type="checkbox" value="+" id="+" v-model="calCode"/>
    <label for="+">add</label>
    <input type="checkbox" value="-" id="-" v-model="calCode"/>
    <label for="-">sub</label>
    <input type="checkbox" value="X" id="*" v-model="calCode"/>
    <label for="*">multiply</label>
    <input type="checkbox" value="%" id="/" v-model="calCode"/>
    <label for="/">divide</label>
    <br />
    <br />
    <p :key="i" v-for="(check, i) in calCode" >
        {{calculate(check)}}
    </p>
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
            calCode : [],

        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        calculate(operate){
            switch(operate){
        
            case '+':
            return this.num1 + this.num2;   
            // 여기서 this.result = his.num1 + this.num2; 처럼 this.result로 받으면, 
            // 여러 연산 동시에 하고싶을때 result 자체의 값은 하나의 값만 받을 수 있기 때문에 오류가 난다. 
            // 그래서 그냥 return값을 ㅗ돌려주기.

            case '-':
            return this.num1 - this.num2;

            case 'X':
            return this.num1 * this.num2;

            case '%':
            return this.num1 / this.num2;

            }
        }
    }
}

</script>