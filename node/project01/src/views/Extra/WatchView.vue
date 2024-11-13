<template>
<div>
    <div>
    <input type="text" id="" v-model="yourName"/>
    </div>
    <div>
        <p>myName </p>
        <p>{{ yourName }}</p>
        <p></p>
        <p></p>
    </div>
    <div>
        <select v-model="selected">
            <option value="A">A</option>
            <option value="B">B</option> 
        </select>
    </div>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            myName:'',
            yourName :'',
            selected : '',
            selectedHistory : [],
        };
    },
    watch:{  
        /// data를 감시. 데이터가 변할 때 마다 기록을 남기기 위한 것. 
        /// data의 이름을 그대로 함수 이름으로 적용해야한다. 

        myName(){
            return console.log(this.myName)
        },
        yourName(newValue, oldValue){  // 매개변수 순서가 정해져있다. 
            console.log('oldValue :', oldValue);
            console.log('newValue :', newValue);
        },
        selected(nv){
            this.selectedHistory.push(nv);
            console.log(this.selectedHistory);
        },
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}

</script>