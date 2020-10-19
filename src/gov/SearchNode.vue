<template>
<div class="tea-page">
   
   <el-form :model="form" label-width="140px">
    
    <el-form-item label="Ephemeral ID">
      <el-input v-model="form.ephemeral_id"></el-input>
    </el-form-item>
    <div style="display:flex; justify-content: flex-end;">
      <el-button :disabled="!form.ephemeral_id" style="width:40%;margin-top: 40px;" type="primary" round @click="submit()">Submit</el-button>
    </div>

    <el-divider v-if="info" />
    <el-card v-if="info">
      <div slot="header">
        <span>Node Info</span>
      </div>
      <el-row v-for="(item, i) in info" :key="i" style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 15px;">
        <el-col :span="4">{{item.key}}</el-col>
        <el-col :span="20" v-html="item.value" style="word-break: break-all;"></el-col>
      </el-row>
    </el-card>

    
  </el-form>
   
</div> 
</template>
<script>
import gov from './gov';
export default {
  data(){
    return {
      info: null,
      form: {
        ephemeral_id: ''
      }
    };
  },
  async mounted(){
    this.$root.loading(true);
    this.layer1 = await gov.buildLayer1();

    
    this.$root.loading(false);
  },
  methods: {
    async submit(){
      this.$root.loading(true);
      const info = await gov.nodeByEphemeralId(this.layer1, this.form.ephemeral_id, (flag, json)=>{
        if(!flag){
          alert('No node for this ephemeral id');
          this.$root.loading(false);
          return false;
        }

        this.buildInfo(json);
        this.form.ephemeral_id = '';

        this.$root.loading(false);
      });
    },
    buildInfo(item){
      const list = [];
      list.push({
        key: 'Peer Id',
        value: item.peerId
      });
      list.push({
        key: 'Tea Id',
        value: item.teaId
      });
      list.push({
        key: 'Ephemeral Id',
        value: item.ephemeralId
      });
      list.push({
        key: 'Http',
        value: item.http
      });
      
      list.push({
        key: 'Status',
        value: item.status
      });
      
      this.info = list;
    }
  }
}
</script>