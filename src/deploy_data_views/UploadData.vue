<template>
<div class="tea-page">
  <DeployDataTaskStep :step="2" />
  
  <el-upload
    style="text-align:left;margin-top: 40px;"
    action="/"
    accept="image/jpeg, image/png"
    :on-change="fileChangeHandler"
    :before-upload="uploadImage"

    :file-list="img_file?[img_file]:[]">
    <el-button size="small" type="primary">Upload the task image</el-button>
    <div slot="tip" class="el-upload__tip">Only receive [jpg/jpeg/png]</div>
  </el-upload>

  <el-form :model="form" label-width="140px" class="p-uploadwasm">
    <el-form-item label="Account">
      <el-select v-model="form.public_key" placeholder="Please select account">
        <el-option
          v-for="(item, i) in account_list"
          :key="i"
          :label="item.name"
          :value="item.address">
        </el-option>
      </el-select>
      <span style="display:block; color:#ccc;">If no account, please intall the chrome plugin and create account.</span>
    </el-form-item>
    <el-form-item label="Deposit Money">
      <el-input v-model="form.money"></el-input>
    </el-form-item>
    
  </el-form>

  
  <div style="display:flex; justify-content: space-between; margin-top: 40px;">
    <el-button style="width:40%;" 
      round 
      @click="clickPrev()">Prev Step</el-button>

    <el-button style="width:40%;" 
    type="primary" 
    round 
    :disabled="!res.image"
    @click="clickNext()">Register Data</el-button>
  </div>
  
</div> 
</template>
<script>
import utils from '../tea/utils';
import http from '../tea/http';
import * as DeployDataTaskStep from './/TaskStep';
export default {
  data() {
    return {
      form: {
        public_key: '',
        money: 10
      },
      img_file: null,

      res: {
        image: null,
      },

      node: null,
    };
  },

  async mounted() {
    this.node = utils.cache.getNode();
    if(!this.node){
      this.$router.replace('/');
    }

    await this.init();
    
  },
  
  methods: {
    reset(){
      this.form = {
        public_key : '',
        money : 10
      };
      this.img_file = null;
      this.res.image = null;
    },
    async init(){
      
      const node = utils.cache.getNode();


      // console.log(this.tea);
    },
    fileChangeHandler(file){

    },
    build_to_file_list(cid){
      return {
        name: cid,
        url: cid
      };
    },
    uploadImage(file){
      this.processUploadFile(file, (cid, buf)=>{
        this.img_file = {
          name: file.name,
          url: file.name
        }
        
      });

      return false;
    },
    
    processUploadFile(file, callback){
      this.$root.loading(true);
      const fr = new FileReader();
      fr.onload = (e)=>{
        // const buf = (e.target.result.replace(`data:${file.type};base64,`, ''));
        let buf = e.target.result;

        this.res.image = buf;

        callback();
        this.$root.loading(false);

      };

      fr.readAsArrayBuffer(file);
      return false;
    },

    clickNext(){
      alert(1)
    },
    clickPrev(){
      this.$router.push('/');
    },
  }
}
</script>