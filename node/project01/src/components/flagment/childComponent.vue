<template>
<div>
    <p>{{childData}}</p>
    <p>{{str}}</p>
    <p>{{num}}</p>
    <p>{{bool}}</p>
    <p>{{arr}}</p>
    <p>{{obj}}</p>
    <select name="" id="" @change="callParent" v-model="selectedNum">
        <option v-for="n in arr" :key="n" :value="n" >{{n}}</option>
    </select>
    <p>select의 value는 선택된 option의 value다</p>
</div>
</template>

<script>

export default{ 
    name:'child',
    components:{},

    props : {
        // 부모에게 전달될 때는 다 스트링이다. 그래서 다 데이터타입을 변형하는 단계가 필요하다.
        // 기본자료형은 데이터타입 그냥 주면 됨.
        str : {
            type : String,
            default : "",
        },
        num : {
            type : Number,
            default : 0,

        },
        bool : {
            type : Boolean,
            default : true,

        },

        // Array, object 는 데이터타입을 펑션으로 전달해야한다.
        // 펑션에 'return' 껴서 줘야한다. 그냥 오브젝트나 어레이로 받는 기능을 안만든듯... 따로 데이터를 받는 방식을 만들어줘야해. 
        arr : {
            type : Array,
            default : function(){
                return []
            },

        },
        obj : {
            type : Object,
            default : function(){
                return {}
            },

        },

    },
    data(){
        return{
            selectedNum : 0,
            childData : '자식컴포넌트의 데이터'
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.$emit('child-send', this.childData)
    },
    unmounted(){},
    methods:{
        callParent(){ 
            /// @chainge-num 커스텀 이벤트를 실행시키기 위한 함수.
            /// this.$emit : 상위컴포넌트로 보내주는 함수?
            /// ('커스텀이벤트이름', '자식컴포넌트 내부의 data가 이벤트 값(getData의 매개변수로 들어갈)으로 같이 들어온다.')
            /// 커스텀 이벤트 이름 이후에 나온 값만 파라미터로 받는다. 이름 이전에 값이 나오면 파라미터로 인지가 안됨
            this.$emit('change-num', this.selectedNum )
        },
        childPrint(){
            console.log(this.childData)
        }
    }
}

</script>