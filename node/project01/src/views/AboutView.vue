<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>


<script>

// view에서는 컴포넌트 직접 연결, html을 붙여준다. 


// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' /// @: src를 뜻함. helloworld.vue 를 불러온대.

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
