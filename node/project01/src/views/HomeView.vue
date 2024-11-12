<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> 
    <!--script에서 땡겨와서 export해준 HelloWorld 컴포넌트를 이곳에서 보여준다고!!!!!!-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' /// @: src를 뜻함. HelloWorld.vue 를 불러온대.

// HelloWorld를 땡겨와서, 
// template으로 export 해준다고!!!!!

export default {    
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped> 

/* scoped 를 넣으면, 해당 페이지에만 style이 적용된다. scoped 빼면 전체 적용됨. 다만 파일관리를 위해  전체에 적용하고싶으면 에셋에 따로 넣어서 관리함 */

</style>
