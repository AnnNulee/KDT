<template>
<div>
    <button @click="sendData" class="btn btn-primary">누르면 데이터가 테이블 컴포넌트로 전송된다고</button>
    <button @click="doDelete">삭제</button>
    <br />
    <Simple
    :headers = "headers"
    :items = "moneyData"
    @saveOption="dataSelect"
    @checkedEvent="checkBoxSelected"
    />

</div>
</template>

<script>
import simpleGridVue from '@/components/flagment/simpleGrid.vue'


export default{ 
    name:'',
    components:{ "Simple" : simpleGridVue },
    data(){
        return{
            moneyData : [],
            fullData : [],
            headers : [
                {title : "exchange", key : 'exchange'},
                {title : "sale", key : 'sale'},
                {title : "buy", key : 'buy'},
                {title : "diff", key : 'diff'},
            ],
            checkedItems : [],

        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        sendData() {
            this.moneyData =             
            [{  exchange : "미국 USD",
                sale : 1396,
                buy : 1420,
                diff : "전일 상승"
            },{  
                exchange : "유럽 EUR",
                sale : 1473,
                buy : 1502,
                diff : "전일 하락"
            },{  exchange : "일본 JPY",
                sale : 894,
                buy : 909,
                diff : "전일 하락"
            },{  exchange : "중국 CNY",
                sale : 192,
                buy : 202,
                diff : "전일 상승"
            }]
            this.fullData = this.moneyData
        },
        dataSelect(data) {
            console.log(data)
            if (data === '2'){
                console.log(data)
                this.moneyData = this.fullData.filter(  (a) => {
                    return a.diff === "전일 상승"
                })
            }
        
            else if (data ==='3'){
                console.log(data)
                this.moneyData = this.fullData.filter( (a) => {
                    return a.diff === '전일 하락'
                })
            }

            else {
                this.moneyData = this.fullData
                return this.moneyData
            }
        },
        checkBoxSelected(data){
            console.log(data)
            this.checkedItems = data
        },
        doDelete(){
            this.moneyData = this.moneyData.filter( (data) => 
            !this.checkedItems.includes(data.exchange) /// A.includes(B) = A를 포함한 B만.
            )

        },
        
    
    }
        
}


</script>