<template>
<div class="tea-page">
  <el-row>
    <el-col :span="6">
      <strong style="line-height:40px;">Layer1 Account</strong>
    </el-col>
    <el-col :span="6">
      <el-select :disabled="step!==1" v-model="layer1_account" placeholder="Please select account">
        <el-option
          v-for="(item, i) in layer1_account_list"
          :key="i"
          :label="item.name"
          :value="item.address">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6" v-if="layer1_balance">
      {{layer1_balance.amount-layer1_balance.locked}}/{{layer1_balance.amount}} <br/>
      {{deposit_tx_id}}
    </el-col>
    <el-col :span="6" v-if="layer1_balance">
      <el-button style="width:100%;" type="primary" @click="layer1_deposit()">Deposit</el-button>
    </el-col>
  </el-row>

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

    <h1 style="color:#0f0">{{S2.status ? 'Success': ''}}</h1>

    <div style="display:flex; justify-content: flex-end;">
      <el-button :disabled="!S2.status" style="width:40%;margin-top: 40px;" type="primary" round @click="s2_next()">Next Step</el-button>
    </div>
  </div>

  <div v-if="step===3">
    <h2>Errand Task</h2>
    
    <div class="s3-info" v-if="S3.deployment_id_for_code">
      <h4>Deployed Code</h4>
      <el-row>
        <el-col :span="6">deployment_id_for_code</el-col>
        <el-col :span="18">{{S3.deployment_id_for_code}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">cid_of_code</el-col>
        <el-col :span="18">{{S3.cid_of_code}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">cid_of_checker</el-col>
        <el-col :span="18">{{S3.cid_of_checker}}</el-col>
      </el-row>
    </div>
    <div class="s3-info" v-if="!S3.deployment_id_for_code">
      <h4>Upload Code</h4>

      <el-row>
        <el-col :span="6">cid_of_code</el-col>
        <el-col :span="18">
          <UploadToIpfs 
            :onChange="(cid)=>{S3.cid_of_code = cid}"
            text="Upload the task Wasm"
            tip="Only receive [wasm]"
            accept="application/wasm" />
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">cid_of_checker</el-col>
        <el-col :span="18">
          <UploadToIpfs 
            :onChange="(cid)=>{S3.cid_of_checker = cid}"
            text="Upload the task checker"
            tip="Only receive [wasm]"
            accept="application/wasm" />
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">cid_of_description</el-col>
        <el-col :span="18">
          <UploadToIpfs 
            :onChange="(cid)=>{S3.cid_of_description = cid}"
            text="Upload the task description"
            tip=""
            accept="application/*" />
        </el-col>
      </el-row>
    </div>

    <div class="s3-info" v-if="S3.deployment_id_for_data">
      <h4>Deployed Data</h4>
      <el-row>
        <el-col :span="6">deployment_id_for_data</el-col>
        <el-col :span="18">{{S3.deployment_id_for_data}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">cid_of_data</el-col>
        <el-col :span="18">{{S3.cid_of_data}}</el-col>
      </el-row>
    </div>

    <div class="s3-info" v-if="!S3.deployment_id_for_data">
      <h4>Upload Data</h4>
      <el-row>
        <el-col :span="6">cid_of_data</el-col>
        <el-col :span="18">
          <UploadToIpfs 
            :onChange="(cid)=>{S3.cid_of_data = cid}"
            text="Upload the data"
            tip=""
            accept="*/*" />
        </el-col>
      </el-row>
    </div>

    <div style="display:flex; justify-content: flex-end;">
      <el-button :disabled="false" style="width:40%;margin-top: 40px;" type="primary" round @click="s3_next()">Run Errand Task</el-button>
    </div>
  </div>

  <div v-if="step===4">
    <h2>Waiting for the Errand task result.</h2>
    <div>
      <h4>{{S4.task_id}}</h4>

      <p>
        <span v-if="!S4.result">Loading...</span>
        <b v-if="S4.result">Result: <font style="color:#f0f; margin-left: 10px;">{{S4.result}}</font></b>
      </p>
    </div>
  </div>


</div>
</template>
<script>
import utils from '../tea/utils';
import http from '../tea/http';
import _ from 'lodash';
import Layer1 from '../tea/layer1';
import Errand from '../workflow/Errand';
import UploadToIpfs from '../components/UploadToIpfs';

export default {
  components: {
    UploadToIpfs,
  },
  data(){
    return {
      layer1_account_list: [],
      layer1_account: null,
      layer1_balance: null,
      deposit_tx_id: null,
      step: 1,

      S1: {
        table: [],
        select: null
      },
      S2: {
        status: false
      },

      S3: {
        deployment_id_for_code: null,
        cid_of_code: null,
        cid_of_checker: null,
        cid_of_description: null,

        deployment_id_for_data: null,
        cid_of_data: null
      },

      S4: {
        task_id: null,
        result: null
      }
    }
  },
  created(){
    this.er = null;
  },

  methods: {
    async layer1_deposit(){
      await this.er.depositToAgentAccount();
    },
    s1_tableSelectHandler(v){
      this.S1.select = v;
    },
    async s1_next(){
      this.step = 2;
      this.er.setLayer1Account(this.layer1_account);
      this.$root.loading(true);
      await this.er.requestBeMyDelegate();

      this.layer1_balance = this.er.layer1_balance;
      this.deposit_tx_id = this.er.deposit_tx_id;
      this.S2.status = true;
      this.$root.loading(false);
    },

    async s2_next(){
      this.step = 3;

      const {deployed_code, deployed_data} = this.er;
      if(deployed_code){
        this.S3.deployment_id_for_code = deployed_code.deployment_id;
        this.S3.cid_of_code = deployed_code.cid;
        this.S3.cid_of_checker = deployed_code.checker;
      }
      if(deployed_data){
        this.S3.deployment_id_for_data = deployed_data.deployment_id;
        this.S3.cid_of_data = deployed_data.cid;
      }
    },

    async s3_next(){
      const {deployed_code, deployed_data} = this.er;
      if(!deployed_code){
        this.er.adhoc_code = {
          cid_of_code: this.S3.cid_of_code,
          cid_of_checker: this.S3.cid_of_checker,
          cid_of_description: this.S3.cid_of_description
        }

        if(!this.S3.cid_of_code || !this.S3.cid_of_checker || !this.S3.cid_of_description){
          this.$message.error("Invalid upload code");
          return false;
        }
      }

      if(!deployed_data){
        this.er.adhoc_data = {
          cid_of_data: this.S3.cid_of_data
        }

        if(!this.S3.cid_of_data){
          this.$message.error("Invalid upload data");
          return false;
        }
      }

      try{
        this.$root.loading(true);
        const res = await this.er.startTask();

        this.S4.task_id = this.er.last_task_id;
        this.step = 4;

        this.mock_s4();
      }catch(e){
        this.$message.error(e.toString());
      }finally{
        this.$root.loading(false);
      }
    },

    mock_s4(){
      _.delay(async ()=>{
        // TODO remove mock
        const cid = 'QmTMXTS8BrrPZ5SdYGfttsjAotphtiPgUmBEd9gNsEeCRA';

        const res = await http.getFromIpfs(cid);
        const json = JSON.parse(utils.forge.util.decode64(res));
        this.S4.result = json.result + ' (This is mock result, not real.)';
      }, 2000);
    }

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
<style lang="scss" scoped>
.s3-info{
  padding: 15px 0;
  border-bottom: 1px solid #c9c9c9;

  h4{
    margin: 4px 0 20px;
    font-size: 25px;
    color: #b8b8b8;
  }

  .el-row{
    padding: 4px 0;
    margin-bottom: 15px;

    .el-col:first-child{
      font-weight: bold;
    }
    .el-col:last-child{

    }

  }

}
</style>