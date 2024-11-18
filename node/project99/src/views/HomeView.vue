<template>
<div>
    <img src="Vue logo" alt="../assets/logo.png">
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
