<template>
    <!--이전) main.js 2)) App.vue에는 라우팅 링크가 되어있다. router 내부 index에서 정의된 '/'와 '/about' 를 참조-->
  <HeaderLayoutVue />
    <div class="container">
      <router-view/>  <!-- 해당 라우터에 맞는 view들을 이곳에 넣겠다. vue문법에 내장 있는 태그들. 예약어임 -->
    </div>
  <FooterLayout />
</template>

<script>
import FooterLayout from './components/layout/FooterLayout.vue'
import HeaderLayoutVue from "./components/layout/HeaderLayout.vue"


export default {
  components : { HeaderLayoutVue, FooterLayout }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
