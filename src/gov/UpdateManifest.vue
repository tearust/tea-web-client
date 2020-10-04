<template>
<div class="tea-page">
  <el-form :model="form" label-width="140px">
    <el-form-item label="Tea ID">
      <el-input :disabled="true" v-model="form.tea_id"></el-input>
    </el-form-item>
    <el-form-item label="Manifest Cid">
      <el-input v-model="form.cid"></el-input>
    </el-form-item>
    

    <div style="display:flex; justify-content: flex-end;">
      <el-button :disabled="!form.tea_id||!form.cid" style="width:40%;margin-top: 40px;" type="primary" round @click="submit()">Update</el-button>
    </div>
  </el-form>

</div>
</template>
<script>
import gov from './gov';
export default {
  data(){
    return {
      account_list: [],
      form: {
        public_key: '',
        tea_id: '',
        cid: ''
      },
    };
  },
  created(){
    this.layer1 = null;
  },
  async mounted(){
    this.$root.loading(true);
    this.layer1 = await gov.buildLayer1();

    this.account_list = await this.layer1.extension.getAllAccounts();
    this.$root.loading(false);
    
    this.form.tea_id = this.$route.params.tea_id;

  },
  methods: {
    async submit(){
      this.$root.loading(true);
      const res = await gov.updateManifest(this.layer1, this.form.public_key, this.form.tea_id, this.form.cid, ()=>{
        this.$router.replace('/');

        this.$root.loading(false);
      });
    }
  }
}
</script>