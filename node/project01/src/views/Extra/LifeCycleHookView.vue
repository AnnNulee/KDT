<template>
<div>
    <label for="">가장 선호하는 프로그래밍 언어?</label>
    <select name="" id="">
        <option value="" v-for="lan in language" :key="lan.code">{{lan.title}}</option>
    </select>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            language:[{}],
        };
    },
    

    setup(){},
    //컴포지션 api 호출
    

    // CREATE = 컴포넌트 준비

        beforeCreated(){},
        //옵션 api가 초기화되기 전. data(), computed()같은 옵션 api의 초기화
        //단 아직 컴포넌트 생성 준비일 뿐 생성실행이 되지 않아 data에 접근하거나 하지 못함.

                // !![CREATING] : 컴포넌트 생성!!

        created(){},
        //data(), computed(), watch(), methods를 모두 초기화해서 사용 준비 완료 단계
        //data 등에 접근 가능함

        // 화면 구성에 방해되지 않는 method 들은 이곳에 넣어준다. 
        // 실행하느라 시간이 걸리는친구들이 여기들어가면 화면이 멈춘다고!
        


    // MOUNT = Dom에 컴포넌트 적용

        beforeMount(){},
        // Dom 노드가 생성되기 전. 

                // !![MOUNTING] : DOM 생성!!

        mounted(){ 
            this.getLanguage()
            },
        // 실제 Dom이 랜더링이 모두 끝난 상태
        // dom 구성이 끝난 후에 데이터를 불러오면 사용자는 dom을 먼저 볼 수 있기때문에 사용자경험이 더 낫다. 
    


    // Update = Data 변경에 따른 리랜더링

        beforeUpdate(){},
        // 변경 data 적용, 리랜더링 직전

                // !![Updating] : 업데이트!

        updated(){},
        // 리랜더링 이후



    //Unmount = Dom에서 컴포넌트 제거

        beforeUnmount(){},
        // 현재 컴포넌트에서 빠져나온 직후 

            // !![UNMOUN] : 컴포넌트 생성!!

        unmounted(){},



    methods:{
        // getLanguage 메소드를 어떤 hook에 넣어야하는가???
        getLanguage(){  
            //서버에서 데이터가 존재
            //서버에서 데이터 가져와야함 
            this.language = [{code:'01', title:'파이썬'}] //서버에서 끌어온다고 쳐보자고... 
        }
    }
}

</script>