<template>
<div>
    <p>1차선택 : 도시</p>
    <p>작동 logic : 선택된cityCode 를 data에 binding => (method)data와 '기차시간'을 매치</p>
    <p>목록 전체를 data에서 가져와야하기 때문에 옵션 전체를 뜻하는 select tag에 v-model 적용</p>
    <p>option에서 보여줄 값은 data에서 바인딩된 도시 이름을 적용 </p>
    <p>도시 리스트를 모두 보여주기 위해 v-for 사용. 키값은 고유값인 cityCode </p>
    <p>select의 value는 </p>
    <p v-pre> Q. option값에 주는 {{ct.name}}에서, 왜 바로 city를 불러오지 않고 그 요소인 ct를 불러와야할까?</p>
    <p v-pre> A. city.name은....말이 안돼. city의 요소는 {오브젝트}이기 때문이다. 그렇기 때문에 List - 오브젝트 - 요소 순으로 순차적으로 불러줘야 해. </p>

    <select v-model="pickedCity" @change="aboard">
        <option :value="ct.cityCode" v-for="ct in city" :key="ct.citycode">{{ct.Name}}</option>
    </select>

    <p>2차선택 : 기차시간</p>
    <p>기차시간 보여주기</p>
    <select>
        <option v-for="at in aboardTime" :key="at.cityCode">{{at.time}}</option>
    </select> 



    <p></p>
    <p></p>
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
            city : [
                {cityCode : '01', Name : '부천'},
                {cityCode : '02', Name : '신촌'},
                {cityCode : '03', Name : '천호'},
            ],

            train : [
                {cityCode : '01', time : "10:00출발(부천)"},
                {cityCode : '02', time : "10:00출발(신촌)"},
                {cityCode : '03', time : "10:00출발(천호)"},
            ],

            pickedCity : "",
            aboardTime : [],
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        aboard(){
            this.aboardTime = this.train.filter(
                (tr) => tr.cityCode == this.pickedCity
            )
        }

    }
}

</script>

