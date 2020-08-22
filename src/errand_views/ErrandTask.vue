<template>
<div class="tea-page">
  <div>
    <h2>Layer Account</h2>
    <el-select :disabled="step!==1" v-model="layer1_account" placeholder="Please select account">
      <el-option
        v-for="(item, i) in layer1_account_list"
        :key="i"
        :label="item.name"
        :value="item.address">
      </el-option>
    </el-select>
  </div>
  <hr/>

  <div v-if="step===1" class="">
    <h2>Select Delegate</h2>
    <el-table
      :data="S1.table"
      stripe
      border
      highlight-current-row
      @current-change="s1_tableSelectHandler"
      style="width: 100%">
      <el-table-column prop="tea_id" label="TEA ID(tea_id)"></el-table-column>
      <!-- <el-table-column prop="rsa" label="RSA KEY"></el-table-column> -->
      <el-table-column prop="http" label="HTTP(http)"></el-table-column>
      <el-table-column prop="ws" label="Websocket(ws)"></el-table-column>
      <el-table-column prop="nkn_id" label="NKN(nkn_id)"></el-table-column>
        
    </el-table>

    <div style="display:flex; justify-content: flex-end;">
      <el-button :disabled="!S1.select || !layer1_account" style="width:40%;margin-top: 40px;" type="primary" round @click="s1_next()">Next Step</el-button>
    </div>
  </div>

  <div v-if="step===2" class="">
    <h2>Request selected to be my delegate.</h2>
  </div>


</div>
</template>
<script>
import utils from '../tea/utils';
import http from '../tea/http';
import _ from 'lodash';
import Layer1 from '../tea/layer1';
import Errand from '../workflow/Errand';
export default {
  data(){
    return {
      layer1_account_list: [],
      layer1_account: null,
      step: 1,

      S1: {
        table: [],
        select: null
      }
    }
  },
  created(){
    this.er = null;
  },

  methods: {
    s1_tableSelectHandler(v){
      this.S1.select = v;
    },
    async s1_next(){
      this.step = 2;
      this.er.setLayer1Account(this.layer1_account);
      this.$root.loading(true);
      await this.er.requestBeMyDelegate();

      this.$root.loading(false);
    },

  },

  async mounted() {
    this.$root.loading(true);
    this.bootstrap = utils.getBootstrapNodes();

    // const obj = await Layer1.getBootstrapNodes();

    const tmp = await http.requestActiveNodes();
    // this.table = _.concat(_.map(obj, x => {
    //   const t = x.toJSON();
    //   t.tea_id = t.teaId;
    //   return t;
    // }), tmp);
    this.S1.table = tmp;

    this.er = new Errand();
    await this.er.init();
    this.layer1_account_list = await this.er.layer1.extension.getAllAccounts();

    this.$root.loading(false);
  },
}
</script>