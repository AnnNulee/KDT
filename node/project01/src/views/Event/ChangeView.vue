<template>
<div>
<p>1차 select에서 도시를 선택하고, 2차에서는 해당 도시에 맞는 기차시간을 보여준다.</p>
<p>1차에서 선택한 도시 코드를 data에 저장하고, 해당 data(도시코드)와 일치하는 기차시간을 걸러 보여준다. </p>
<br />
<br />
<p>1) 도시코드를 data에 저장 : 목록 선택시 cityList 내의 cityCode 값을 V-model로 연결된 pickedCity 데이터 공간으로 보낸다. ==> cityCode가 전송됨</p>
<p>목록 선택시 @change에 심겨진 startTrain함수가 실행된다.</p>
<p>2) 도시코드와 일치하는 기차시간을 거른다 : startTrain 함수는, 1차에서 선택된 cityCode와 일치하는 trainList를 필터링하여 해당 배열은 pickedList로 보낸다. </p>
<p>3) 필터링된 list (pickedList)를 옵션으로 보여준다.</p>

<br />
<br />
<p> select에서 change를 안써도, v-model 적용된 pickedCity를 항상 양방향 실시간 렌더링을 하고있기 때문에 </p>
<p> 2차 select에 옵션에 적용된 pickedCity에도 값이 연동되어 "Eventlisnter처럼" 값이 바뀌자마자 바로바로 브라우저 상에서 렌더링이 가능하다!!! </p>
<p> 프론트 단에서 'data'의 변동을 바로바로 적용할 수 있다는 점이 크게 고무적이라고~~</p>
<!-- change사용 -->
    <select name="" id="" @change="startTrain" v-model="pickedCity"> 
    <!-- <select name="" id="" v-model="pickedCity">  -->
        <option value="">===도시선택===</option>
        <option :value="city.cityCode" v-for="city in cityList" :key="city.cityCode">{{city.cityName}}</option>
    </select>

    <br />
    <br />
    <p> 하위 select </p>
    <p> v-model 할 필요 없음</p>


    <select name="" id="" >
        <option :value="train.trainCode" v-for="train in pickedList" :key="train.trainCode" >{{train.time}}</option>
        <!-- <option :value="train.trainCode" v-for="train in trainList.filter((train) => train.cityCode == pickedCity)" :key="train.trainCode" >{{train.time}}</option> -->
    </select>

    <p>change : 값이 변화되면 이것을 한다. </p>
    <p>value값에 binding된 data를 넣고싶으면 v-bind:value의 줄임말인 :value로 써야한다. value 옆에 콜론 붙이라고!!!! :value</p>
    <p></p>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            cityList: [
                {cityCode : '01', cityName : '부천'},
                {cityCode : '02', cityName : '신림'},
                {cityCode : '03', cityName : '천호'},
            ],
            trainList : [   // 해당 데이터는 실제로는 서버의 database에서 가져온다. 여기서 cityCode는 cityList에서 가져온 외래키임
                {cityCode : '01', trainCode : 't01', time : '10:00 출발(부천)'},
                {cityCode : '01', trainCode : 't02', time : '10:10 출발(부천)'},
                {cityCode : '01', trainCode : 't03', time : '10:20 출발(부천)'},

                {cityCode : '02', trainCode : 't04', time : '10:00 출발(신림)'},
                {cityCode : '02', trainCode : 't05', time : '10:40 출발(신림)'},

                {cityCode : '03', trainCode : 't06', time : '11:00 출발(천호)'},
                {cityCode : '03', trainCode : 't07', time : '10:30 출발(천호)'},
                {cityCode : '03', trainCode : 't08', time : '11:10 출발(천호)'},
            ],
            pickedCity : "", // 선택된 도시의 cityCode가 담긴다.
            pickedList : [], // 선택된 city의 cityCode에 맞는 trainList를 담아준다.
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        //trainList에 필터를 적용할 것.  1차 select에서 선택한 cityCode와 같은 trainList를 보여주어야한다. 
        //1차에서 선택된 cityCode와 일치하는 trainList를 필터링하여 해당 배열은 pickedList로 보낸다.
        startTrain(){
            this.pickedList = this.trainList.filter(    // trainList 내부를 특정 조건으로 걸러서 pickedList에 대입(=)하겠다.
                (train) => train.cityCode == this.pickedCity // 필터링 조건 : 1차에서 선택된 cityCode와 일치하는 trainList 
                // 함수(여기서는 arrow)를 짠 이유 : filter함수는 매개변수로 함수를 받는다. 
                // 여기서 filter는 리스트를 받아서, 하나하나 개별적 요소에 접근하여 메소드에 적합한(조건)요소를 거르는 역할을 한다. ==> 매개변수train은 trainList의 요소 하나하나를 뜻한다.
            )
        },
    }
}

</script>

