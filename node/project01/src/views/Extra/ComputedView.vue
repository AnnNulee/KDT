<template>
<div>
    <p>method 말고 computed 쓸거야. method 이렇게 쉽게 data처럼 꺼내쓰지 못해.</p>
    <p>computed는 함수의 값을 나타내줄 때(return), 결과만 받아오고 싶을 때 유용하게 써먹을 수 있다</p>
    <p>computed : "계산된"</p>
    <p>method </p>

    <br />
    <p>1. 무지성 바인딩 </p>
    <p><b>{{title}} / {{date}} / {{create}}</b></p>

    <br />
    <p>2. Computed 함수 바인딩 : 단방향</p>
    <p><b>{{totalText}}</b></p>
    <p>computed 내에서 만든 함수는 data처럼 바인딩이 가능하다.</p>

    <br />
    <p>3. Computed 함수 바인딩 : 기존방식</p>
    <div>
        <input type="text" v-model.number="age">
        <p><b>{{ age >= 20? '성인' : '미성년자' }}</b></p>

        <p v-pre><small>{{ age >= 20? '성인' : '미성년자' }}</small></p>
        <p><small>함수 조건 ? true일경우 값 : false일경우 값</small></p>
        <br />
        <br />
    </div>
    <p>data 바인딩해서 직접 기능정의</p>

    <br />
    <p>4. Computed 함수 바인딩 : 양방향</p>
    <p><b>{{ageStandardComputed}}</b></p>
    <p v-pre><small>{{ageStandardComputed}}</small></p>
    <p>computed 내에서 함수를 만들어 data처럼 바인딩이 가능하다. computed는 캐싱을 통해 해당 데이터에 종속되어 계속해서 감시 중. </p>
    <p>데이터가 변경 될 때만 재계산 된다. 성능최적화. 리랜더링 되더라도 데이터가 변경되지 않았을 때는 실행되지 않는다.</p>
    <br />
    <br />
    <p>4-1. method 함수 바인딩</p>
    <p><b>{{ageStandardMethod()}}</b></p>
    <p v-pre><small>{{ageStandardMethod()}}</small></p>
    <p>() : 함수를 실행해라. method내의 함수가 '호출'되었을때 실행된다. </p>
    <p> 랜더링 될 때 실행된다. </p>



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
            title : '밥먹고싶은 이유',
            date : '0000.00.00',
            create : '신누리',
            age : 0,

        };
    },
    computed : {
        totalText(){
            return this.title + " / " + this.date + " / " + this.create
        },
        ageStandardComputed(age){
            return this.age >=20? '성인' : '미성년자'
        }
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        ageStandardMethod(age){
            return this.age >=20? '성인' : '미성년자'
        }
    }
}

</script>