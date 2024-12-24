<template>
<div>
    <div>
        {{주류.대표이미지}} 
    </div>
    <div> 
        {{주류. 상품명}}
        {{주류. 판매가}}
        <div>
            {{주류. 상품명}}
            <button>주문수량 빼기 버튼</button>
            <input type="int" v-model="주문.수량" >
            <button>주문수량 더하기 버튼</button>
            <p>{{주류.판매가}} X {{주문.수량}}</p>
        </div>
        <div>
            <button @click="찜">찜</button> 클릭 시 찜 엔터티에 추가. ()
            <button @click="장바구니">장바구니</button> 클릭 시 장바구니 엔터티에 추가 + "장바구니로 갈래? y/n"
            <button @click="바로구매">바로구매</button> 클릭시 주문엔터티에 추가 + 주문페이지로 이동
        </div>
    </div>


        <br> 라인으로 섹션 나누기

    <div>
        <h1>추천상품</h1>
    </div>
    <div>
        <div>
            <연관제품1 대표이미지>
            <연관제품1 가격>
        </div>
        <div>
            <연관제품2 대표이미지>
            <연관제품2 가격>
        </div>
        <div>
            <연관제품3 대표이미지>
            <연관제품3 가격>
        </div>
        <div>
            <연관제품4 대표이미지>
            <연관제품4 가격>
        </div>
    </div>
    

        <br> 라인으로 섹션 나누기


    <div>
        <ul>
            <li><a href="#">상품상세정보</a></li> 상세정보 뷰 : 상품이미지. 
            <li><a href="#">배송안내</a></li> 배송안내 뷰 : 텍스트만. 
            <li><a href="#">교환 및 상품</a></li> 교환 및 상품 뷰 : 텍스트만.
            <li><a href="#">상품후기</a></li> 상품후기 뷰 : 리뷰게시물 리스트
                                                
        </ul>
    </div>
    <div>
        //// 각 버튼 클릭하면 해당 뷰 보여주는 div
    </div>


</div>
</template>


<script>
import axios from 'axios'; 


export default{ 
    name:'',
    components:{},
    data(){
        return{
            주문수량 : 0,

        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{

        찜{
            상품정보 찜 엔터티에 추가
        },

        장바구니{
            1. 상품정보 + 주문수량 => 장바구니 엔터티에 추가
            2. "장바구니 갈래? y/n" 모달창 띄우기
        },

        바로구매 {
            1. 상품정보 + 주문수량 => 주문 엔터티에 추가
            2. 주문페이지로 이동
        }        
    }
}

</script>