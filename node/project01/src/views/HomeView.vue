<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>  <!--script에서 땡겨와서 export해준 HelloWorld 컴포넌트를 이곳에서 보여준다고!!!!!!-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' /// @: src를 뜻함. helloworld.vue 를 불러온대.

export default {    //// HelloWorld를 땡겨와서, template으로 export 해준다고!!!!!
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
