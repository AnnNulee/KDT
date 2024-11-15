<template>
<div>
    <select name="" id="" class="form-select me-5" aria-select="Default select example" v-model="sOption" @change="onlyShow" >
        <option value="1">모두보기</option>
        <option value="2">전일 상승</option>
        <option value="3">전일 하락</option>
    </select>


    <table class="table table-bordered table-striped">
        <thead>
        <tr>
            <th v-if="sOption == '1'">
                <input type="checkbox">
            </th>
            <th v-for="col in headers" :key="col">{{col.title}}</th>
        </tr>
        </thead> 
        <tbody>
            <tr v-for="(item, i) in items" :key="i">
                <th v-show ="sOption === '1'">
                    <input type="checkbox">
                </th>
                <th v-for="col in headers" :key="col.key">{{item[col.key]}}</th>
            </tr>
        </tbody>
    </table>
    <!-- <p v-pre> {{item[col.key]}} 해석 : {{"item 객체에 있는 [col 객체에 있는 "key"라는 이름의 key의 value]" 라는 이름의 key의 value값}}</p> -->
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    props : {

        headers : {
            type : Array,
            default : function () {
                return []
            }
        },
    
        items : {
            type : Array,
            default : function () {
                return []
            },
        },

    },

    data(){
        return{
            sOption : '1',
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        onlyShow (){
            console.log(this.sOption)
            this.$emit('saveOption', this.sOption)
            }
            
        }
    }


</script>