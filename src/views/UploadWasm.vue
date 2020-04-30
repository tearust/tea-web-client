<template>
  <el-form :model="form" label-width="80px" class="p-uploadwasm">

    <el-form-item label="Public Key">
      <el-input v-model="form.public_key"></el-input>
    </el-form-item>
    <el-form-item label="Gas">
      <el-input v-model="form.gas"></el-input>
    </el-form-item>

    <el-form-item label="Wasm">
      <el-upload
        style="text-align:left;"
        action="/"
        accept="wasm"
        :on-change="fileChangeHandler"
        :before-upload="beforeUploadHandler"
        :limit="1"
        :file-list="form.wasm?[form.wasm]:[]">
        <el-button size="small" type="primary">点击上传</el-button>
        <span v-if="file_error" slot="tip" style="display:block;position:relative; top:-10px; color:red">{{file_error}}</span>
      </el-upload>
    </el-form-item>
    
    <el-form-item>
      <el-button :disabled="!(form.public_key && form.gas && wasm_buf)" style="width:100%;" round type="success" @click="clickSubmitHandler()">Start Caculate</el-button>
    </el-form-item>
    

  </el-form>
    
</template>

<script>
import tea from '../tea';


export default {
  data(){
    return {
      form: {
        public_key: '',
        gas: '10',
        wasm: null,
      },
      wasm_buf : null,
      file_error: null,
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
      this.tea = new tea();
      await this.tea.connect();

      console.log(this.tea);
    },

    fileChangeHandler(file){
      console.log(file);
    },
    beforeUploadHandler(file){
      if(!/wasm$/.test(file.type)){
        this.file_error = 'Only accept wasm file.';
        return false;
      }

      this.form.wasm = file;

      const fr = new FileReader();
      fr.onload = (e)=>{
        this.wasm_buf = e.target.result;
        console.log(this.wasm_buf);
      };

      fr.readAsArrayBuffer(file);
      return false;
    },
    async clickSubmitHandler(){
      this.$root.loading(true);

      try{
        const rs = await this.tea.sendTask({
          ...this.form,
          wasm: this.wasm_buf,
        });
        this.$message.success(rs);
      }catch(e){
        this.$message.error(e);
      }finally{
        this.$root.loading(false);
        this.form = {
          public_key: '',
          gas: '10',
          wasm: null,
        };
        this.wasm_buf = null;
        this.file_error = null;
      }
      
    }
  },

  
}
</script>


<style lang="scss">
.p-uploadwasm{

}
</style>
