<template>
<div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userModal">Show Modal</button>
    <p>버튼과 슬롯div를 연결하려면, data-bs-target="#(modalIdValue)를 정의해주어야함</p>
    <SM>
        <template v-slot:title>모달창 타이틀</template>
        <template v-slot:body>
            <div class="row gy-2">
                <p>모달 1</p>
                <p>모달 2</p>
                <p>모달 3</p>
            </div>
        </template>
        <template v-slot:footer>
            <button class="btn btn-primary">확인</button>
            <button class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        </template>
    </SM>  

    <p>내가 정의한 slot컴포넌트이름으로 테그를 만들어 테그 안에 slot컴포넌트로 보낼 slot템플릿을 넣어준다</p>
    <p>연결할 modal컴포넌트에 :id값을 줘야한다.</p>
    <p>id값을 여기서 정의하고, 자식 컴포넌트에서 prop으로 받는다</p>
    <p>**슬롯테그(SM) 중, ':id를 받아주는 props'를 안 쓴 테그는 default로 정의된다. 여기선 userModal로 자동 디폴트 정의 됨. </p>



    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#information">정보입력</button>
    <SM modalIdprops="information">
        <template v-slot:title>사용자 입력 창</template>
        <template v-slot:body>
            <div class="row gy-2">

                <div class="col-3">
                    <label for="" class="form-label">이메일주소</label>
                </div>
                <div class="col-9">
                    <input type="email" id="" class="form-control"/>
                </div>

                <div class="col-3">
                    <label for="" class="form-label">전화번호</label>
                </div>
                <div class="col-9">
                    <input type="tel" id="" class="form-control"/>
                </div>

                <div class="col-3">
                    <label for="" class="form-label">주소</label>
                </div>
                <div class="col-9">
                    <input type="text" id="" class="form-control"/>
                </div>

            </div>
        </template>
        <template v-slot:footer>
            <button class="btn btn-primary">저장</button>
            <button class="btn btn-danger" data-bs-dismiss="modal">닫기</button>
        </template>   
    </SM>

    <p></p>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#usermodal3">모달3</button>
    <SM modalIdprops="usermodal3">
        <template v-slot:title>룰루</template>
        <template v-slot:body>룰루</template>
        <template v-slot:footer>
            <button class="btn btn-primary" data-bs-dismiss="modal">닫기</button>
        </template>
    </SM>
</div>
</template>

<script>
import SlotModal from '@/components/flagment/SlotModal.vue';


export default{ 
    name:'',
    components:{ SM : SlotModal },
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