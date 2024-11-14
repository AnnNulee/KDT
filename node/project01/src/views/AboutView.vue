<template>
  <div class="about">

    <HelloWorld msg="s"/>
  </div>
</template>


<script>

import HelloWorld from '@/components/HelloWorld.vue' /// @: src를 뜻함. helloworld.vue 를 불러온대.

export default {
  name: 'AboutView',
  components: {
    HelloWorld
  }
}
</script>
