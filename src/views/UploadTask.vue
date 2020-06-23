<template>
<div class="tea-page">
  
<div v-if="!result">
  <TaskStep :step="3" />
  <el-form :model="form" label-width="140px" class="p-uploadwasm">

    <el-form-item label="Public Key">
      <el-input v-model="form.public_key"></el-input>
    </el-form-item>
    <el-form-item label="Gas">
      <el-input v-model="form.gas"></el-input>
    </el-form-item>

    <el-form-item label="Checker Cid">
      <el-input disabled v-model="form.res.checker"></el-input>
    </el-form-item>

    <el-form-item label="Image Cid">
      <el-input disabled v-model="form.res.image"></el-input>
    </el-form-item>

    <el-form-item label="Manifest Cid">
      <el-input disabled v-model="form.res.wasm_fest"></el-input>
    </el-form-item>

    <el-form-item label="Task Wasm Cid">
      <el-input disabled v-model="form.res.wasm"></el-input>
    </el-form-item>
    

  </el-form>

  <div style="display:flex; justify-content: space-between; margin-top: 40px;">
    <el-button style="width:40%;" 
      round 
      @click="clickPrev()">Prev Step</el-button>

    <el-button style="width:40%;" 
      type="success" 
      round 
      :disabled="!(form.public_key && form.gas)"
      @click="clickSubmitHandler()">Send task to layer1</el-button>
  </div>
</div>

<div v-if="result">
  <h3 v-html="result"></h3>

  <el-button 
      type="primary" 
      round 
      :disabled="!(form.public_key && form.gas)"
      @click="clickSendTaskForTest()">Calculate task for Test</el-button>
</div>
  

</div> 
</template>

<script>
import tea from '../tea';
import TaskStep from '../components/TaskStep';
import utils from '../tea/utils';

export default {
  components: {
    TaskStep
  },
  data(){
    return {
      form: {
        public_key: '',
        gas: '10',
        res: {}
      },
      result: null,
    }
  },

  created() {
    this.tea = null;
  },

  async mounted() {
    this.$root.loading(true);
    await this.init();
    this.$root.loading(false);
  },

  methods: {
    async init(){
      this.form.res = {
        image: utils.cache.get('img_file_cid'),
        checker: utils.cache.get('checker_file_cid'),
        wasm: utils.cache.get('wasm_file_cid'),
        wasm_fest: utils.cache.get('wasm_fest_file_cid'),
      };

      const node = utils.cache.getNode();
      this.tea = new tea(node);
      await this.tea.connect();

      // console.log(this.tea);
    },

    
    async clickSubmitHandler(){
      this.$root.loading(true);

      // registr new task
      const {ref_num, rsa_pub_key} = await this.tea.registerNewTask(parseInt(this.form.gas, 10));

      console.log('ref_num =>', ref_num);
      console.log('rsa_pub_key =>', rsa_pub_key);

      utils.crypto.set_rsa_publickey(rsa_pub_key);

      // add new task
      // const ref_num = 33333;
      const new_task_param = {
        teaId: this.tea.node.tea_id,
        refNum: ref_num,
        rsaPub: this.tea.node.rsa,
        capCid: this.form.res.checker,
        manifestCid: this.form.res.wasm_fest,
        wasmCid: this.form.res.wasm,
        modelCid: 'NA',
        dataCid: this.form.res.image,
        payment: this.form.gas,
      };

      await this.tea.addNewTask(new_task_param, (f, block)=>{
        if(f){
          this.result = `
            Block => ${block} <br/>
            Ref num => ${ref_num} <br/>
            Calculating...
          `;

          // this.form.public_key = '';
          this.form.gas = '10';

          this.$root.loading(false);
        }
      });
      


      
      
    },
    clickPrev(){
      this.$router.push('/upload_res');
    },

    async clickSendTaskForTest(){
      this.$root.loading(true);
      try{
        const rs = await this.tea.sendTask({
          public_key: this.form.public_key,
          gas: this.form.gas,
          image_cid: this.form.res.image,
          checker_cid: this.form.res.checker,
          wasm_manifest_cid: this.form.res.wasm_fest,
          wasm_cid: this.form.res.wasm,
        });
        // this.$message.success(rs);
        this.result = rs;

        this.form.public_key = '';
        this.form.gas = '10';
      }catch(e){
        this.$message.error(e);
      }finally{
        this.$root.loading(false);
        
      }
    }
  },

  
}
</script>


<style lang="scss">

</style>
