<template>
<div>
    <div>
        {{selectedProduct.main_image}} // url 바인딩
    </div>
    <div> 
        <h1>{{selectedProduct.name}}</h1>
        <p>{{selectedProduct.name}}</p>
        <p>{{selectedProduct.price}}</p>
        <div>
            {{selectedProduct.name}}
            <button @click="plusQ">-</button>
            <input type="number" v-model="orderQuantity" >
            <button @click="minusQ">+</button>
            <p>{{selectedProduct.price * orderQuantity}}</p>
        </div>
        <div>
            <button @click="addLikes">찜</button>
            <button @click="addCarts">장바구니</button> 
            <button @click="dirOrder">바로구매</button> 
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
            selectedProduct : {
                name : '발렌타인',
                price : 5000,
            },
            orderQuantity : 0,
        };
    },
    setup(){},
    created(){},
    mounted(){
        this.getProducts()
    },
    unmounted(){},
    methods:{

        // Product 정보 가져오기
        async getProducts() {
            try {
                //도메인 요청, 돌아오는 response 잡기
                const response = await axios.get(`http://localhost:3000/products/${product_id}`);
                // product_id에 해당하는 제품 data object를 받아온다.
                this.selectedProduct = response.data ; 
            }catch(err) {
                console.error(err);
            }
        },

        plusQ() {
            this.orderQuantity += 1;
        },
        minusQ() {
            this.orderQuantity += 1;
        },

        async addLikes() {
            try {
                //1. selectedProduct.id 를 likes DB에 추가
                await axios.post(`http://localhost:3000/orders/like`, this.selectedProduct.id);
                    // 사용자 아이디는 뭐 어떻게 알더라? 세션에서 가져오나. ?
                    //await axios.post(`http://localhost:3000/orders/like`, this.selectedProduct.id, 세션정보)

                // 2. 찜에 추가되었습니다. 모달 띄우기

            } catch(err) {
                console.error(err);
            }
        },

        addCarts() {
            // selectedProduct.id 와 orderQuantity 를 carts DB에 추가. 
            // "장바구니 갈래? y/n" 모달창 띄우기
        },

        dirOrder() {
            // selectedProduct.id 와 orderQuantity 를 orders DB에 추가. 
            // 주문 페이지로 이동
        }        
    }
}

</script>