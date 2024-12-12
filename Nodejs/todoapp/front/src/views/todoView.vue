<template>
<div id='app' class='container mt-5'>
    <h1>My To-Do App</h1>
    <div>
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
        <div class="carousel-inner">
            <div class="carousel-item"
            :class="{active: index === 0}"
            v-for = "(singleImage, index) in imageData"
            :key = "index">
                <img :src="`http://localhost:3000/${singleImage}`" class="d-block w-100" alt="..."  :style="{
                    height: '150px',
                    objectFit:  'cover',
                    width: '100%'
                }">
            </div>
            <br>
            <br>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
    </div>
     <p>지금은 서버가 두개 다 로컬폴더 내에 있기 때문에 src를 로컬 경로로 접근이 가능한 상태니까, 우리가 하고자 하는건. 개별적인 서버를 연동시키는 작업을 해야하기 때문에 front에서 server에 사진을 req을 get요청하여 서버간의 data전달을 짜주는 것. </p>
     <p>img : src 에서, 포트까지는 서버주소이고 그 이후는 이미지</p>    
    <div>
        <div>
            <form @submit.prevent="addTodo" class="input-group">
                <div class="input-group mb-3">
                    <input type="text" v-model="newTodoText" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">입력</button>
                </div>
            </form>
            <table class='table'>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Re-title</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in todos" :key="todo.id">
                        <td>{{ todo.id }}</td>
                        <td>{{ todo.title }}</td>
                        <td class="align-middle text-center">
                            <div class="form-check form-switch d-flex justify-content-center">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" @change="changeStatus(todo)" v-model="todo.done">
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click="deleteTodo(todo.id)">삭제</button>
                        </td>
                        <td>
                            <!-- Button trigger modal -->
                            
                            <button @click="idGiver(todo.id)" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            수정
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <form @submit.prevent="">
                <input type="file" @change="fileChange">
                <button type="submit" class="btn btn-primary" @click="uploadImage" >Upload</button>
            </form>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Todo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateTitle" class="input-group">
                        <div class="input-group mb-3">
                            <input type="text" v-model="editTitle" class="form-control" placeholder="edit Todo" aria-label="Recipient's username" aria-describedby="editButton">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateTitle" data-bs-dismiss="modal">수정</button>
                </div>
            </div>
        </div>
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
            todos:[], //
            newTodoText: '',
            editTitle:'',
            choosenId:0,

            file : null, // 이미지파일이 들어오느냐 안들어오느냐 체크 
            imageData: [],
        };
    },
    setup(){},
    created(){
        this.getTodo()
        this.getImages() // 캐러셀에 이미지 띄우기. 
    },
    mounted(){},
    unmounted(){},
    methods:{
        idGiver(id){ //'수정'버튼에서 받은 todo.id를 데이터 변수에 저장
            this.choosenId = id
        }, 
        fileChange(event){
            this.file = event.target.files[0] // 타겟은 위의 input에 들어온 값. 타입을 file에 놓음. 그래서 files라는 값에 배열형태로 저장가능. 
            console.log(event.target.files)
        },

        async getTodo() {
            const response = await axios.get('http://localhost:3000/')
            this.todos = response.data
            console.log(this.todos)
        },
        async addTodo() {
            const response = await axios.post('http://localhost:3000/', {reqTitle: this.newTodoText}); //(req 보낼 주소, req 에 넣을 데이터/ 요청에서 주고받는 data는 req의 body에 들어간다)
             // 서버가 response로 보내준 값이 axios에서 리턴값으로 들어온다. 
            this.todos = response.data
            console.log(response.data)
        },
        async changeStatus(todo) {
            await axios.put(`http://localhost:3000/${todo.id}`, {done : todo.done})
            console.log(this.todos)
        },
        async deleteTodo(id){
            const response = await axios.delete(`http://localhost:3000/${id}`) // axios는 요청만 보낸다. 응답을 기다리지 않음
            this.todos = response.data
        },
        async updateTitle() {
            //수정 버튼을 누르면 폼으로 입력받아 그 값을 put으로 보내야함
            const response = await axios.put(`http://localhost:3000/edit/${this.choosenId}`, {title: this.editTitle})
            this.todos = response.data 
            console.log(response);
        },

        async uploadImage() {
            if (!this.file) return; // 업로드 된 파일이 없으면 리턴. 파일이 없으면 오류나니까 그거 방지, 에러캐치용

            const formData = new FormData();
            formData.append('image', this.file); // 업로드할때 서버로부터 업로드. 전송할때 폼 데이터를 보낼 것.  포스트는 폼을 보통 쓰므로 그냥 폼 데이터형식으로 보내겠다. 
        
            axios.post('http://localhost:3000/img/upload', formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data' //이 형식
                }
            })
            console.log(formData)
        },

        async getImages() {
            const response = await axios.get('http://localhost:3000/img');
            this.imageData = response.data;
            console.log(this.images)
        }
    }
}
</script>