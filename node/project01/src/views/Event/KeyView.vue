<template>
<div>

    <p>keyup만 쓰면, enter를 감지하는 함수를 굳이 지정해주고 그 함수에 또 startSearch함수를 지정줘야한다.</p>
    <input type="search" name="" id="" v-model="searchInput" @keyup="checkEnter($event)" />
    <button @click="startSearch">Search</button>
    <br />
    <br />

    <p>keyup.enter를 쓰면 바로 startSearch 가능</p>
    <input type="search" name="" id="" v-model="searchInput" @keyup.enter="startSearch"/>
    <button @click="startSearch">Search</button>
    <br />
    <br />
    <h1>{{searchText}}</h1>

    <p>input값을 입력하고, search 버튼을 누른 후에! h1출력을 나타내고 싶은 경우!</p>
    <p v-pre>{{startSearch()}} 로 바인딩하면, 해당함수에서 정의된 return값을 표시해준다.</p>
    <p>input 값과 h1출력값을 같은 data에 담으면, click을 하기 전에 실시간 랜더링이 되기 때문에 구분이 되지 않는다.  </p>
    <p>input값을 data에 전송하고, "click시 data에 저장된 input값을, data에 마련된 출력값의 공간으로 대입하는" 함수를 실행 </p>
    <p>h1출력값에 출력값 data 바인딩해준다.</p>

    <input type="radio" @click.prevent="preventClick"> 
    <p>click.prevent : 클릭을 막고, 대신 적용된 함수를 실행한다.</p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <br />
    <div>
        <div style='width: 200px; height: 200px;' @click="parentClick" class='parent'>
            <div style='background-color: red;' @click.stop="childClick" class='child'></div>
        </div>
        <p>click.stop="method" : 버블링 없이 해당 method만 실행한다.</p>
    </div>


</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            searchInput : "",
            searchText : "",
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        startSearch(){
            this.searchText = this.searchInput
        },
        checkEnter(event){   //checkEnter(event)에서 받는 event는 enter키의 특정한 키코드를 받는다. 키코드가 맞는지 알아내야지!
            if(event.keyCode === 13) {
                this.startSearch()
            }
        },
        preventClick(){
            alert('클릭금지')
        },
        parentClick(){
            console.log('부모태그 이벤트 발생')
        },
        childClick(){
            console.log('자식태그 이벤트 발생')
        },
    },
}

</script>

<style scoped>
.parent {
    border: 1px solid blue; display: inline-block;
}
.child {
    width: 50px; height: 50px; margin: 20px;
}
</style>