<template>
<div class="tea-page">
  <TaskStep :step="1" />

  <b>Bootstrap node address: {{bootstrap}}</b>
  <h4>Candidate List</h4>

  <el-table
    :data="table"
    stripe
    border
    highlight-current-row
    @current-change="handleSelectChange"
    style="width: 100%">
    <el-table-column prop="tea_id" label="TEA ID"></el-table-column>
    <el-table-column prop="http" label="HTTP"></el-table-column>
    <el-table-column prop="ws" label="Websocket"></el-table-column>
    <el-table-column prop="nkn_id" label="NKN" width="200"></el-table-column>
      
  </el-table>

  <el-button style="width:100%;margin-top: 40px;" type="primary" round @click="clickNext()">Next Step</el-button>
</div>
</template>
<script>
import TaskStep from '../components/TaskStep';
import utils from '../tea/utils';
import http from '../tea/http';
import _ from 'lodash';

export default {
  components: {
    TaskStep
  },
  data() {
    return {
      bootstrap: null,
      table: [],
      select: null
    }
  },
  async mounted() {
    this.bootstrap = utils.getBootstrapNodes();
    this.table = await http.requestActiveNodes();
    console.log(this.table);
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
      utils.cache.put('select-node', this.select);
      utils.setHttpBaseUrl(this.select.http);

      this.$router.push('/upload_res');
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