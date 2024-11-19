<template>
  <!-- <nav>
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
      <router-link to="/slot">SlotModal</router-link> |
      <router-link to="/propdrilling">Prop Drilling</router-link> |
      <br />
      <br />
      <router-link to="/customDirective">Custom Directive</router-link> |
    </nav>-->

    <!-- 이전) main.js 2)) App.vue에는 라우팅 링크가 되어있다. router 내부 index에서 정의된 '/'와 '/about' 를 참조 -->

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" @click="goToMenu('/')">네비게이션 바 이름임</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" @click="goToMenu('/String')">DataBinding</a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        DataBinding
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="goToMenu('/String')">Action</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/attribute')">attribute</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/html')">html</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/input')">input</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/class')">class</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/attribute')">attribute</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/list')">list</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/csr')">Checkbox + Select + Radio</a></li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Extra
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="goToMenu('/String')">Action</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/attribute')">attribute</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/html')">html</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/input')">input</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/class')">class</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/attribute')">attribute</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/list')">list</a></li>
                        <li><a class="dropdown-item" @click="goToMenu('/csr')">Checkbox + Select + Radio</a></li>
                    </ul>
                </li>

                <li class="nav-item">
                    <a class="nav-link" @click="goToMenu('/pageView_title')">Reuse</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="goToMenu('/customDirective')">Advanced</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="goToMenu('/mixin')">Mixin</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="goToMenu('/plugin')">PlugIn</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">aria-disabled="true"</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  
</template>

<script>


export default{
    methods:{
        goToMenu(path){ 
        //href와 비슷함. 여기에 path정보를 주면, $router는 vue에서 쓰는 해당 router로 이동하라는 뜻. 
        // object로 값을 받는데 고정된 키 'path' : 받는 패스 경로인 path 값.
            this.$router.push({path : path})
        }
    },
}
</script>


<style scoped>
a {
    cursor : pointer;
}
</style>

