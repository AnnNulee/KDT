<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>


<script>

// view에서는 컴포넌트 직접 연결, html을 붙여준다. 
// view.vue는 한 페이지 자체를 구성하는 컴포넌트를 의미하고, *.vue는 부분 컴포넌트를 정의한다.
// single file component : vue의 특징. (template / script / css) 


// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' /// @: src를 뜻함. helloworld.vue 를 불러온대.

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
