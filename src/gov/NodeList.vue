<template>
<div class="tea-page" style="position:relative">

  <h4>Layer1 Node List</h4>

  <el-button @click="$router.push('register_node')" style="position:absolute; top:0; right: 0;" type="primary">Add New Node</el-button>
  <el-table
    :data="table"
    stripe
    border
    highlight-current-row
    @current-change="handleSelectChange"
    style="width: 100%; margin-top: 40px;">
    <el-table-column prop="tea_id" label="TEA ID(tea_id)"></el-table-column>
    <el-table-column prop="http" label="HTTP(http)"></el-table-column>
    <el-table-column prop="manifest_cid" label="Manifest Cid"></el-table-column>
    <el-table-column prop="status" label="Status"></el-table-column>
    <el-table-column label="Action">
      <template slot-scope="scope">
        <el-link type="primary" @click="gotoUpdate(scope.row)">Update</el-link>
      </template>
      
    </el-table-column>
      
  </el-table>

</div>
</template>
<script>
import gov from './gov';
import utils from '../tea/utils';
import _ from 'lodash';
export default {
  data(){
    return {
      select: null,
      table: []
    };
  },
  methods: {
    handleSelectChange(val) {
      this.select = val;
    },
    gotoUpdate(item){
      const tea_id = _.slice(item.tea_id, 2).join('');
      this.$router.push('/update/'+tea_id);
    }
  },
  created(){
    this.layer1 = null;
  },
  async mounted(){
    this.$root.loading(true);
    this.layer1 = await gov.buildLayer1();
    const list = await gov.getLayer1NodeList(this.layer1.api);
    console.log(list);
    this.table = list;

    this.$root.loading(false);
  }
}
</script>