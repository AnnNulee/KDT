<template>
<div>
    <div class="col-3">
        <label for="email" class="form-label" >이메일주소</label>
        <input type="email" id="email" class="form-control" v-focus/>
    </div>
    <div class="col-3">
        <label for="pw" class="form-label">비밀번호</label>
        <input type="password" id="pw" class="form-control"/>
    </div>
    <div>
        <label for="" class="form-label">전화번호</label>
        <input type="text" v-number /> - <input type="text" v-number /> - <input type="text" v-number />
    </div>
    <div>
        <button class="btn btn-primary">로그인</button>
    </div>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    //원래 vue에서 제공하는 기능이 아닌 것을 java로 정의하여 활용한다. 
    
    directives: {
        focus : {
            mounted(el, binding) {  // 여기서 el 은 element, 여기서는 이메일주소 input
                el.focus()
            }
        },
        number : {
            mounted(el){
                el.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/\D/g,"")   // replace(a,b) = a를 b로 변경해준다.
                })
            }
        },
    },
    data(){
        return{
            sampleData:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}

</script>