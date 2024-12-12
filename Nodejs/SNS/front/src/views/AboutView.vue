<template>
<div>
 <p>{{ result }}</p>
</div>
</template>

<script>
import axios from "axios"

export default{ 
  name:'',
  components:{},
  data(){
    return{
      result : '',
    };
  },
  setup(){},
  created(){},
  mounted(){
    this.test()
  },
  unmounted(){},
  methods:{
    async test() {
      const response = await axios.get('http://localhost:3000')
      console.log(response)
      this.result = response.data
    }
  }
}

</script>