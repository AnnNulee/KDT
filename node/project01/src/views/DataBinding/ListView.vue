<template>
<div>
    <p>table을 만들때는 data의 값을 반복문 써서 꺼내줍시다. </p>
    <p>반복문에는 중복되지 않는 값인 key값 (id같은거) 을 하나 잡아야해.</p>
    <p>만약 고유값이 없으면 index 등으로 만들어준다.  </p>
    <p></p>
    <p v-pre>  :key = "index" v-for="(member, index) in members" </p>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Company</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr :key= "sand.Id" v-for="sand in sandwiches">
                <th>{{ sand.Id }}</th>
                <th>{{ sand.Name }}</th>
                <th>{{ sand.comp }}</th>
                <th> ￦ {{ sand.price }} 원</th>
                <th><input type="text" v-model='sand.qty'></th>
                <th> ￦ {{ sand.price * sand.qty }} 원 </th>
            </tr>
        </tbody>
    </table>
    <br/>
    <br/>
    <br/>
    <br/>
    <table>
        <thead>
            <tr>
                <th>INDEX</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
                <th>BMI</th>
            </tr>
        </thead>
        <tbody>
            <tr :key = "index" v-for="(member, index) in members">
                <th>{{ index + 1 }}</th>
                <th>{{ member.Name }}</th>
                <th>{{ member.gender }}</th>
                <th><input type="text" v-model="member.age"></th>
                <th><input type="text" v-model="member.height"></th>
                <th><input type="text" v-model="member.weight"></th>
                <th>{{calBMI(member)}}</th>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            sandwiches : [
                {
                    Id : '1',
                    Name : '로스트치킨샌드위치',
                    comp : 'subway', 
                    price : 6500,
                    qty : 0,
                },
                {
                    Id : '2',
                    Name : 'BLT샌드위치',
                    comp : 'subway', 
                    price : 7200,
                    qty : 0,
                },

                {
                    Id : '3',
                    Name : '햄에그마요샌드위치',
                    comp : 'CU', 
                    price : 3000,
                    qty : 0,
                },

                {
                    Id : '4',
                    Name : '돈가스샌드위치',
                    comp : 'salady', 
                    price : 8500,
                    qty : 0,
                },

                {
                    Id : '5',
                    Name : '베지샌드위치',
                    comp : 'GS', 
                    price : 2500,
                    qty : 0,
                },
            ],
            members : [
                {
                    Name : '신누리',
                    gender : '여',
                    age : 0,
                    height : 0,
                    weight : 0,
                    BMI : 0,  
                },
                {
                    Name : '한태윤',
                    gender : '남',
                    age : 0,
                    height : 0,
                    weight : 0,
                    BMI : 0,  
                },
                {
                    Name : '신성한',
                    gender : '남',
                    age : 0,
                    height : 0,
                    weight : 0,
                    BMI : 0,  
                },
                {
                    Name : '황신영',
                    gender : '여',
                    age : 0,
                    height : 0,
                    weight : 0,
                    BMI : 0,  
                },
                {
                    Name : '김수빈',
                    gender : '여',
                    age : 0,
                    height : 0,
                    weight : 0,
                    BMI : 0,  
                },
                
            ],
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
        calBMI(member){
            const height2 = (member.height/100)**2
            return member.weight / height2 
        },
    }
}

</script>