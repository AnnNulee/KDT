<template>
<div>
    <select class="form-select my-2" aria-label="Default select example"
    @change="diffChange" v-model="selectedData">
        <option value="all">모두 보기</option>
        <option value="high">전일 상승</option>
        <option value="low">전일 하락</option>
    </select>
    <table class="table table-bordered table-striped">
        <thead>
        <tr>
            <th v-for="col in headers" :key="col">{{col.title}}</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in items" :key="i">
                <th v-for="col in headers" :key="col.key">{{item[col.key]}}</th>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    props:{
        headers : {
            type : Array,
            default : function () {
                return []
            }

        },
        items : {
            type: Array,
            default : function () {
                return []
            }
        }

    },
    data(){
        return{
            sampleData : '',
            selectedData : 'all',

        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        diffChange() {
                this.$emit("diff-change", this.selectedData)
        }
    }
}
</script>