<template>
  
<div>
    <p v-pre> string의 binding 은 {{중괄호}}로 불러온다. </p>
    <p> binding 할 data 는 script - export defalt{} - data() 내부에 정의되어있어야 한다.</p>

    <h1>{{ userName }}님, welcome </h1>

    <p v-pre> 코드 ==> {{ userName }}님, welcome </p>
    <br/>
    <br/>
    <p>{{ msg }}</p>
    
    <p v-pre>코드 ==> {{ msg }}</p>
    <br/>
    <br/>
    <p> vue의 template tag 안에는 div를 하나 넣어주어야 한다</p> 
    <p> =왜?=> 최상단의 하나의 태그 (주로 div)만 가져야 한다. </p>
    <p> 예를 들어 div가 같은 레벨에서 2개이거나하면 안됨. ㅋㅋㅋ왜인진 모름.</p>
    <p> 예측하자면 template은 실제로 dom 구성에 영향을 미치지 않기 때문에 최상위 테그로 실질적인 dom구조를 먼저 잡아주는 넉낌</p>
</div>

</template>



<script>
// 바인딩 : script에 있는 data를 template에 끼워 넣는 것.
// script  > template : 단방향, 
// script <> template : 양방향, 
// vue에서는 function 안쓰고 그냥 이름() 하면 선언임
export default {
    data (){ //  data 함수 선언. 우리가 사용하고자 하는 모든 데이터는 이곳에서 선언. 
        return{
            userName : 'Peter Kim',    
            // 해당 정보를 template에 binding 하기 위해서는 {{중괄호 두개}}로 감싸서 객체를 주어야 한다. 
            msg : 'Hi there my name is peter kim.',
        }
    } 
    

}
</script>

<style>

</style>