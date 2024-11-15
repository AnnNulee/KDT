<template>
<div>
    <button class="btn btn-primary" @click="doSearch">조회</button>
    <br />
    <br />
    <simpleGrid
    :headers = "headers"
    :items = "sandwiches"
    
    />
</div>
</template>

<script>
import simpleGridVue from '@/components/flagment/simpleGrid.vue';   ///컴포넌트 임포트!!!! 여기 임포트 하고 export conpoments 에 등록하기


export default{ 
    name:'',
    components:{ 
        'simpleGrid' : simpleGridVue,

         },
    data(){ 
        return{
            sandwiches : [],
            headers : [   ////headers 를 일일히 이렇게 만들어주는 이유는, 우리가 어떤 key값을 받아올지 지정해주기 위해서. 필요한 컬럼만 받아오려고!
                {title : "swNo", key : 'Id' },
                {title : "swName", key : 'Name' },
                {title : "swComp", key : 'comp' },
                {title : "swPrice", key : 'price' },
                {title : "swQty", key : 'qty' },

            ],
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{

        doSearch () {
            this.sandwiches = [
                {
                    Id : '1',
                    Name : '로스트치킨샌드위치',
                    comp : 'subway', 
                    price : 6500,
                    qty : 0,
                },
                {
                    Id : '2',
                    Name : 'BLT샌드위치',
                    comp : 'subway', 
                    price : 7200,
                    qty : 0,
                },

                {
                    Id : '3',
                    Name : '햄에그마요샌드위치',
                    comp : 'CU', 
                    price : 3000,
                    qty : 0,
                },

                {
                    Id : '4',
                    Name : '돈가스샌드위치',
                    comp : 'salady', 
                    price : 8500,
                    qty : 0,
                },

                {
                    Id : '5',
                    Name : '베지샌드위치',
                    comp : 'GS', 
                    price : 2500,
                    qty : 0,
                },
            ]
        }
    }
}

</script>