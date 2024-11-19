export default {
    setup(){},
    created(){
        // 라이프사이클 훅 api에서 실행되는 함수는, view 보다 mixin 에 있는 함수가 먼저 실행된다!
        console.log('mixin created')
    },
    mounted(){
        console.log('mixin mounted')
    },
    unmounted(){},
    methods: {
        async $get(url) {
            //axios.get(url) 하면 object데이터를 받아온 상태이다. 여기서 그 내부에 있는 data 부분에 접근하는 것. 
            return await axios.get(url).catch( (e) => {
                console.log(e)
            }).data
        },
        async $post(url, data) {
            return await axios.post(url, data).catch( (e) => {
                console.log(e)
            })
        },
        async $put(url, data) {   // 내 서버에 있는 데이터를 수정하는
            return await axios.put(url, data).catch( (e) => {
                console.log(e)
            })
        },
        async $delete(url) {
            return await axios.delete(url, data).catch( (e) => {
                console.log(e)
            })
        },
        $convertDateFormat(date, format){
            let year = ''
            let month = ''
            let day = ''

            if (typeof date === 'string' && date.length === 8) {
                year = date.substring(0,4)
                month = date.substring(4,6)
                day = date.substring(6,8)
            } else if (typeof date === 'object') {
                year = date.getFullYear()
                month = (date.getMonth() + 1).toString().padStart(2,0)
                day = (date.getDay() + 1).tostring().padStart(2,0)
            }
        return format.replace('YYYY', year).replace('MM', month).replace('DD', day)
        },

    }
}