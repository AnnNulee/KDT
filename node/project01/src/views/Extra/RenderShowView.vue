<template>
<div>
    <p><b>가장 좋아하는 프로선수?</b></p>
    <input type="radio" id="y" value="yoona" v-model="player"/>
    <label for="y">1. 김연아 </label>
    <input type="radio" id="h" value="son" v-model="player"/>
    <label for="h">2. 손흥민 </label>
    <input type="radio" id="k" value="kyung" v-model="player"/>
    <label for="k">3. 김연경 </label>
    <input type="radio" id="r" value="ryu" v-model="player"/>
    <label for="r">4. 류현진 </label>
    <br />
    <br />
    <input type="radio" id="e" value="etc" v-model="player">
    <label for="e">5. v-if 기타 </label>
        <div  v-if="player==='etc'">
            <input type="text" v-model='inputPlayer' @keyup.enter="outputPlayer" />
            <button @click="outputPlayer">입력</button>
        </div>
    <p>v-if는 값 자체가 구현되지 않는다. 조건이 성립해야 코드가 진행이 되던말던</p>
    <br />
    <input type="radio" id="e2" value="etc2" v-model="player">
    <label for="e2">6. v-show 기타 </label>
        <input type="text" v-show="player==='etc2'" v-model='inputPlayer' @keyup.enter="outputPlayer" />

    <h3>{{player}}</h3>
    
    <p>v-show는 값은 들어오는데(코드는 실행시켜놓고), 브라우저 노출 단계에서 display:none으로 가린 것. </p>

     
    <p></p>
    <p></p>
    <p></p>
    <br />
    <br />
    <br />
    <br />
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            player : '',
            inputPlayer: '',
         
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        outputPlayer(){
            this.player = this.inputPlayer
        }
    }
}

</script>