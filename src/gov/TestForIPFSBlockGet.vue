<template>
<div class="tea-page">

  <el-card v-if="url_list">
    <div slot="header">
      <span>URL List</span>
    </div>
    <div v-for="(url, i) in url_list" :key="i">
      {{url}}
    </div>
  </el-card>

  <el-card style="margin-top: 12px;">
    <div slot="header">
      <span>CID List</span>
    </div>
    <div v-for="(url, i) in cid_list" :key="i" style="margin-top: 5px;">
      <span>{{url}}</span>
      <el-button @click="remove_cid(url, i)" style="margin-left: 20px;" size="small" type="danger" plain icon="el-icon-close" circle></el-button>
    </div>
    <el-divider />
    <el-row>
      <el-col :span="18">
        <el-input v-model="input" size="small" placeholder="Input CID"></el-input>
      </el-col>
      <el-col :span="6" style="padding-left: 20px;">
        <el-button @click="add_cid()" type="primary" size="small" plain icon="el-icon-plus" circle></el-button>
      </el-col>
    </el-row>
    
    
  </el-card>

  <div style="margin-top: 20px; text-align:center;">
    <el-button @click="clickSubmit()" type="primary" style="width:200px;">Confirm</el-button>
  </div>
  
</div>

</template>
<script>
import gov from './gov';
import utils from '../tea/utils';
import _ from 'lodash';
import axios from 'axios';
export default {
  data(){
    return {
      input: '',
      url_list: null,
      cid_list: [],
    }
  },

  async mounted(){
    this.$root.loading(true);
    this.layer1 = await gov.buildLayer1();
    const tmp_list = await gov.getLayer1NodeList(this.layer1.api);
    this.url_list = _.uniq(_.map(tmp_list, (item)=>{
      return item.http;
    }));

    this.$root.loading(false);
  },
  methods: {
    async clickSubmit(){
      if(this.cid_list.length < 1){
        return false;
      }
      this.$root.loading(true);
      _.each(this.url_list, async (url)=>{
        const res = await this.post(url);

        console.log(res);
      });
      // for(let i=0, len=this.url_list.length; i<len; i++){
      //   const url = this.url_list[i];
        
      // }
      this.$root.loading(false);
    },
    async post(tar){
      const _axios = axios.create({
        baseURL: tar
      });
      const url = '/admin/ipfs?action=layer1.event.layer1.get_res';
      return await _axios.post(url, JSON.stringify(this.cid_list));
    },
    add_cid(){
      if(!this.input){
        alert('invalid cid');
        return false;
      }

      this.cid_list.unshift(this.input.toString());
      this.input = '';

    },
    remove_cid(url){
      const tmp = _.clone(this.cid_list);
      _.remove(tmp, (x)=>x===url);
      this.cid_list = tmp;
    }
  }
}
</script>