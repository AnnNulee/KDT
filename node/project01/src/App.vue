<template>
  <nav>
    <router-link to="/">Home</router-link> | 
    <router-link to="/about">About</router-link> |
    <router-link to="/list">Binding</router-link> |
      <br/>
      <br />
      <br/>
      <br />
      <router-link to="/string">String</router-link> |
      <router-link to="/attribute">Attribute</router-link> |
      <router-link to="/html">Html</router-link> |
      <router-link to="/input">Input</router-link> |
      <router-link to="/class">Class</router-link> |
      <router-link to="/list">List</router-link> |
      <router-link to="/csr">Checkbox + Select + Radio</router-link> |
      <br />
      <br />
      <router-link to="/calB">Calulator w/ Button</router-link> |
      <router-link to="/calR">Calulator w/ Radio</router-link> |
      <router-link to="/calCB">Calulator w/ checkbox</router-link> |
      <br />
      <br />
      <router-link to="/click">Click</router-link> |
      <router-link to="/change">Change</router-link> |
      <router-link to="/changeP">Change-practice</router-link> |
      <router-link to="/key">Key</router-link> |
      <br />
      <br />
      <router-link to="/render">Render</router-link> |
      <router-link to="/renderShow">RenderShow</router-link> |
      <router-link to="/computed">Computed</router-link> |
      <router-link to="/watch">Watch</router-link> |
      <router-link to="/lifecycle">lifecycle</router-link> |
      <br />
      <br />
      <router-link to="/pageView_title">PageView_title</router-link> |
      <router-link to="/parent">ParentView-childComponent</router-link> |
      <router-link to="/grid">Table</router-link> |
      <router-link to="/gridtest">Table:test</router-link> |
      
      




    <!--이전) main.js 2)) App.vue에는 라우팅 링크가 되어있다. router 내부 index에서 정의된 '/'와 '/about' 를 참조-->
  </nav>
  <router-view/>   <!-- 해당 라우터에 맞는 view들을 이곳에 넣겠다. vue문법에 내장 있는 태그들. 예약어임 -->
</template>

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
