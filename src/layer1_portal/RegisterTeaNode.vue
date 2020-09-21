<template>
<div class="tea-page">
  <div id="js_codemirror"></div>
  <el-button type="primary" @click="run_init_layer1_tea_node()">INIT LAYER1 TEA_ID AND MANIFEST</el-button>

</div>
</template>
<script>
import Layer1Main from './layer1_main';
export default {
  data(){
    return {
      
    };
  },
  created(){
    this.lm = null; 
  },
  async mounted(){
    this.lm = new Layer1Main(document.getElementById('js_codemirror'));
    await this.lm.init();
  },
  methods: {
    async run_init_layer1_tea_node(){
      await this.lm.addTeaNode();
    }
  }
}
</script>