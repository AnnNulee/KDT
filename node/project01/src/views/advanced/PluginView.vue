<template>
<div>
    <p>{{ $t('greeting', {a : username }) }}</p> 
    <p>{{ $t('welcome', {a : username }) }}</p>
    <p>{{ $t('language') }}</p>

    <p>값과 연동된 오브젝트를 함수 내에 넣어주어야 포메팅이 된다.  </p>

    <button @click="changeLanguage('ko')">한국어</button>
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('es')">Español</button>
    <p>plugin은 기능단위 </p>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            username : '신누리'
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        changeLanguage(lang){
            this.$i18n.locale = lang;   //'locale'에 지정된 값의, json에 들어있는 값 출력한다. 
        }
    }
}

</script>