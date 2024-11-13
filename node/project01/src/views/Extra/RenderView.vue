<template>
<div>
    <p>select 에서 선택된 value값에 따라 버튼이 render 되는지 구분해준다.</p> 
    <br />
    <p>조회 : 모두 </p>
    <p>등록 : 관리자 + 판매자</p>
    <p>삭제 : 관리자</p>
    <br />

    <p>각각의 v-if문 적용</p>
    <button >조회</button> 
    <button v-if="userRole==='A' || userRole==='S'">물품등록</button>
    <button v-if="userRole==='A'">물품삭제</button>


    <p>v-if 세트는 테그가 떨어져있어도 "순서만 지켜주면" 먹는다. </p>    
    <p>다른 태그에 있어도 v-if문를 찾아서 순서 먹여줌. 다만 무조건 형제태그여야해</p>
    <br />

    <div v-if="userRole==='C'">    
        <button>조회</button>
    </div>

    <div v-else-if="userRole==='S'">
        <button>물품등록</button>
        <button>조회</button>
    </div>

    <div v-else-if="userRole==='A'">
        <button>물품삭제</button>
        <button>물품등록</button>
        <button>조회</button>
    </div>
    <br />
    <p> 관리자, 판매자, 유저 에게 보여줄 조건문의 순서는 문법상 관련이 없지만, 사용상 성능을 위해서는 가장 많은 유저가 사용할 부분이 가장 먼저 실행되는게 유리하다.</p>
    




    <br />
    <br />

    <select name="" id="" v-model="userRole">
        <option value="A">Admin</option>
        <option value="S">Seller</option>
        <option value="C">Customer</option>
    </select>

    <p></p>
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
            userRole : "C",
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}

</script>