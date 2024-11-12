<template>
<div>
    <div>
        <h1>checkbox : where we'll be at </h1>
        <p> {{ candidate }}</p>
    </div>

        <input type="checkbox" name="" id="B" value="Bucheon" v-model="candidate" />
        <label for="B">부천</label>
        <input type="checkbox" name="" id="S" value="Sinlim" v-model="candidate"/>
        <label for="S">신림</label>
        <input type="checkbox" name="" id="J" value="Jonggak" v-model="candidate"/>
        <label for="J">종각</label>

    <p>checkbox는 boolean을 받기 위해 있다.</p>
    <p>Checkbox는 다중선택이 가능하다. 해당 value를 다중으로 저장하기 위해서는 [배열]로 저장한다. </p>
    <p>label for 에 id값을 주면 선택 영역을 확보할 수 있다. </p>


    <br />
    <br />
    <br />
    <div>
        <h1>Select :  pick 1 for Baskin </h1>
        <p> {{ icecream }}</p>
    </div>
        <select name="" id="" v-model="icecream">
            <option value="candy">파핑캔디</option>
            <option value="mom">엄마는외계인</option>
            <option value="black">블랙소르베</option>
            <option value="rainbow">레인보우샤베트</option>
            <option value="straw">사빠딸</option>
        </select>
    
    <br />
    <br />
    <br />
    <div>
        <h1>Radio : Language </h1>
        <p> {{ language }}</p>
    </div>
        <div>
            <input type="radio" name="" id="kor" value="Korean" v-model="language"/>
            <label for="kor">Korean</label>
        </div>
        <div>
            <input type="radio" name="" id="en" value="English" v-model="language"/>
            <label for="en">English</label>
        </div>
        <div>
            <input type="radio" name="" id="ja" value="Japaness" v-model="language"/>
            <label for="ja">Japaness</label>
        </div>
        <div>
            <input type="radio" name="" id="none" value="" v-model="language"/>
            <label for="none">없어요</label>
        </div>
    <p>radio는 택 1.</p>
    <p>인풋이 어떤 한 곳에 모은다는 정의를 하기 전에는 (v-model를 정하기 전까지는)여러가지가 체크가 된다. </p>
    <p></p>
    <p></p>
    <p></p>




</div>
</template>

<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            candidate : [],
            icecream : "choose 1 flavor for a single cup",
            language : "", // 내부에 초기값으로 template단의 value를 넣으면 해당 radio가 초기값으로 선택되어있다!!! 
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}

</script>