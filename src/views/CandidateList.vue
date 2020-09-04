<template>
<div class="tea-page">
  <TaskStep :step="1" v-if="!isDeployData && !isDeployCode" />
  <DeployDataTaskStep :step="1" v-if="isDeployData || isDeployCode" />

  <b>Bootstrap node address: {{bootstrap}}</b>
  <h4>Candidate List</h4>

  <el-table
    :data="table"
    stripe
    border
    highlight-current-row
    @current-change="handleSelectChange"
    style="width: 100%">
    <el-table-column prop="tea_id" label="TEA ID(tea_id)"></el-table-column>
    <!-- <el-table-column prop="rsa" label="RSA KEY"></el-table-column> -->
    <el-table-column prop="http" label="HTTP(http)"></el-table-column>
    <el-table-column prop="ws" label="Websocket(ws)"></el-table-column>
    <el-table-column prop="nkn_id" label="NKN(nkn_id)"></el-table-column>
      
  </el-table>

  <div style="display:flex; justify-content: flex-end;">
    <el-button style="width:40%;margin-top: 40px;" type="primary" round @click="clickNext()">Next Step</el-button>
  </div>
  
</div>
</template>
<script>
import TaskStep from '../components/TaskStep';
import DeployDataTaskStep from '../deploy_data_views/DeployDataTaskStep';
import utils from '../tea/utils';
import http from '../tea/http';
import _ from 'lodash';
import Layer1 from '../tea/layer1';

export default {
  components: {
    TaskStep,
    DeployDataTaskStep
  },
  data() {
    return {
      bootstrap: null,
      table: [],
      select: null,

      mode: null,
      isDeployData: false,
      isDeployCode: false,
    }
  },
  created(){
    this.mode = utils.get_env('env');
    this.isDeployData = this.mode === 'deploy_data';
    this.isDeployCode = this.mode === 'deploy_code';
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
    this.table = tmp;

    this.$root.loading(false);
  },
  methods: {
    handleSelectChange(val) {
      this.select = val;
    },
    clickNext() {
      if(!this.select){
        this.$message.error("Select candidate first");
        return false;
      }
      console.log(this.select);
      utils.cache.saveNode(this.select);
      utils.setHttpBaseUrl(this.select.http);

      if(this.isDeployData){
        this.$router.push('/upload_data');
      }
      else if(this.isDeployCode){
        this.$router.push('/upload_code');
      }
      else{
        this.$router.push('/upload_res');
      }
      
    }
  }
}
</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>