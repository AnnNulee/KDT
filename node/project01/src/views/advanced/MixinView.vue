<template>
<div>
    <h1>Mixin</h1>
    <p>옵션 api를 따로 빼서 관리하는 목적. 컴포넌트에 불러와 사용 가능 </p>
</div>
</template>

<script>
// import formatter from '@/mixins/formatter'
// import Axios from '@/mixins/axios'


export default{ 
    // js 임포트 받아주는건 mixins api다.
    components: {},
    // mixins : [ formatter, Axios ],  
                                            // 해당 MIXIN 들은, index.js로 몰아넣고 main js에서 임포트 해서 넣어서 각주처리해줌
    setup(){},
    created(){
        console.log(Date('20241119'));
        ///convertDateFormat 은 Formatter.js에서 정의해준 method이다. 임포트 후에는 본인것처럼 빼서 사용이 가능함.
        //$표시를 붙여서 mixin method임을 나타낸다.
        console.log(this.$convertDateFormat('20241119', 'YYYY년 MM월 DD일'));

        console.log('view created');
        // this.getCostomers();

    },
    mounted(){
        console.log('view mounted');
    },
    unmounted(){},
    methods:{
        convertDateFormat(date, format){
            let year = ''
            let month = ''
            let day = ''

            if (typeof date === 'string' && date.length === 8) {
                year = date.substring(2,4)
                month = date.substring(4,6)
                day = date.substring(6,8)
            } else if (typeof date === 'object') {
                year = date.getFullYear()
                month = (date.getMonth() + 1).toString().padStart(2,0)
                day = (date.getDay() + 1).tostring().padStart(2,0)
            }
        return format.replace('YYYY', year).replace('MM', month).replace('DD', day)
        },

        async getCostomers() {
            const customers = await this.$get('http://localhost:3000');
            console.log(customers);
        }
    }
}


</script>