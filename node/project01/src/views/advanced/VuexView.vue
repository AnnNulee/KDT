<template>
<div>
    <div>{{ todoState }}</div>
    <p>{{ todosCount }}</p>
    <p>완료 : {{ doneTodosCount }}</p>
    <p>안완료 : {{ notDoneTodosCount }}</p>
    <button @click="addItem">additem</button>
    <button @click="removeItem(4)">remove Item</button>
    <button @click="doneYN({id:1, done:false})">change</button>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            sampleData:''
        };
    },

    computed:{   // store에서 데려오는 값들은, 변환되는 값을 추적하기 위해 computed에 넣는다.
        todoState(){
            return this.$store.state.todoModules.todoState   /// index에서 정의한 모듈명으로 todos.js에 접근한다.
        },
        todosCount(){
            return this.$store.getters['todoModules/todosCount']
        },
        doneTodosCount(){
            return this.$store.getters['todoModules/todosCount']
        },
        notDoneTodosCount(){
            return this.$store.getters['todoModules/notDoneTodosCount']
        }, 
    },

    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        addItem(){
            //this.$store.commit('add', {id:4, title:'할일 4', done:false})   // mutations는 commit으로 불러온다. 
            this.$store.dispatch('todoModules/add', {id:4, title:'할일 4', done:false})   // actions는 dispatch로 불러온다.
        },
        removeItem(id) {
            this.$store.commit('todoModules/remove',id)
        },
        doneYN(doneState){
            this.$store.commit('todoModules/doneYN', doneState)
        },
    }
}

</script>