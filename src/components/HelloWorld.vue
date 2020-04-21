<template>
  <h1>1111</h1>
    
</template>

<script>
import NKN from '../NKN';


export default {
  created() {
    this.nkn = new NKN();
    this.nkn.start();
  },

  
}
</script>


<style lang="scss">
  
</style>
