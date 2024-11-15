<template>
<div>

    <h1>Perent Component</h1>
    <h3>============Child Components============</h3>
    <div>
        <br />
        <br />
        <h2>{{ receivedData }}</h2>
        <button @click="changeValue" class="btn btn-primary"> child data </button>
        <br />
        <child 
        str="하위컴포넌트(childComponent)로 전달할 변수값"
        :num = parentNum 
        :bool = false 
        :arr = [1,2,3]
        :obj = parentObj
        @change-num="getData"
        @child-send="getChildData"
        ref="uniqueValue"
        />
    </div>
    <h3>====================================</h3>
    <p v-pre><child str="하위컴포넌트로 전달할 변수값"/></p>
    <p>상위컴포넌트(HomeView)의 template에 적용한 [하위컴포넌트(HelloWorld) html tag] 내부에서 전달할 변수를 선언할 수 있다</p>
    <p>변수를 어떤 데이터값으로 전달하던 'str'타입으로 전달된다.  </p>
    <p>이것을 바꿔주려면 바인딩":"을 해주면 데이터타입을 알아서 인지함. 데이터 바인딩을 해도 되고.</p>
    <br />
    <br />   
    <h1>props</h1>
    <p>상위 컴포넌트(HomeView)에서 하위컴포넌트(HelloWorld)로 전달해준 변수(msg)를 받는 곳.</p>
    <p>하위 컴포넌트는 props 옵션을 사용하여 """"""받을(수신할) 것으로 기대되는 props를 명시적으로 선언""""""해야합니다</p>
    <p>방법은 상위컴포넌트(HomeView)의 template에 적용한 하위컴포넌트(HelloWorld) html tag 내부에서 전달할 변수를 선언한다.</p>
    <p>rmfjaus template에서 데이터처럼 binding할 수 있다.</p>

    <br />
    
    <br />
    <br />
    <h3>props의 데이터타입</h3>
    <p>props 의 데이터타입은 다 str으로 전달된다. 데이터타입은 따로 변환해주어야 한다. </p>
    <p>그래서 Array 나 object 같은 경우 데이터를 해당하는 방식으로 return하는 함수를 만들어야한다. </p>
    <br />
    <br />
    <h3>커스텀 이벤트 </h3>
    <p>@change-num 그냥 이렇게 만들면 됨. </p>
    <p>callParent 함수에서 해당 이름과 같은 변수를 전달해줄 때 이벤트가 실행됨</p>
    <br />
    <br />
    <h3>emit : 자식함수에서 부모함수로 data 보내기</h3>
    <p>childComponent.vue 내부에서 method로 emit함수를 활용하여 데이터 전달 메소드를 정의해서 사용.</p>
    <p>this.$emit : 상위컴포넌트로 data를 보내주는 함수.</p>
    <p>('커스텀이벤트이름', '자식컴포넌트 내부의 data가 이벤트 값(getData의 매개변수로 들어갈)으로 같이 들어온다.')</p>
    <br />
    <br />   
    <h1>props</h1>
    <p>상위에서 하위로 값을 전달한다 : template의 하위컴포넌트 테그 내부에 적는다.</p>
    <p>하위에서는 데이터를 받을 공간을 만들어준다. : script에서 props를 정의해준다.</p>
    <p>하위의 script 내부에서 정의되었기 때문에, 이건 하위의 data가 된다. 즉, 하위의 template에서 바인딩하여 사용할 수 있다.</p>
    <br />   
    <h1>$emit</h1>
    <p>부모 컴포넌트로 이벤트를 전송하는 역할. </p>
    <p>하위에서 상위의 이벤트를 발생시키며 동시에 데이터를 전달한다.</p>
    <br />   
    <h1>refs</h1>
    <p>상위에서 하위의 data나 함수를 활용하고싶을 때. refs가 id같은 역할을 한다.</p>
    <p>상위의 template에 만들어진 하위컴포넌트 테그의 내부에 넣어놓고, 고유값을 적는다.</p>
    <p>refs.uniqueValue.DATAand함수 이런 방식으로 호출</p>
    <p>다만 부모 템플릿에서 바인딩은 불가</p>
    <br />
    <br />   
    <br />
    <br />       
    <br />
    <br />   

<p>p</p>

</div>
</template>


<script>
import childComponentVue from '@/components/flagment/childComponent.vue';


export default{ 
    name:'',
    components:{'Child' : childComponentVue},

    data(){
        return{
            parentNum : 10,
            parentObj : { 
                mom : "female",
                dad : "male",
                },
            parentArray : [1,2,3],
            data : {},
            receivedData:"",

        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        getData(data){
            console.log("getData 함수 호출");
            console.log(data);
        },
        getChildData(data){
            this.receivedData = data;
        },

        ///refs 값을 불러와서 하위컴포넌트와 연결하면, 해당 하위 컴포넌트의 데이터와 메소드를 사용할 수 있다. 
        changeValue(){
            this.$refs.uniqueValue.childData="해당 데이터는 변경 되었다."; // refs의 값으로 찾아야한다. 
            this.$refs.uniqueValue.childPrint()
        },

    }
}

</script>