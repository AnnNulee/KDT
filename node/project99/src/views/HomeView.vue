<template>
<div>
    <img src="@/assets/logo.png" alt="vueLogo">
    <HelloWorld msg="이게 헬로 월드 메세지임"/>
</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";


export default {    
  name: 'HomeView',
  components : {
    HelloWorld
  },
  
}
</script>
