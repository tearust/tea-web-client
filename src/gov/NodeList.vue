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
    <el-table-column prop="peer_id" label="Peer ID"></el-table-column>
    <el-table-column prop="tea_id" label="TEA ID"></el-table-column>
    <el-table-column prop="http" label="HTTP"></el-table-column>
    <el-table-column prop="manifest_cid" label="Manifest Cid"></el-table-column>
    <el-table-column prop="status" label="Status"></el-table-column>
    <el-table-column label="Action">
      <template slot-scope="scope">
        <el-link type="primary" @click="gotoUpdate(scope.row)">Update</el-link>
        <span style="margin: 0 10px;">|</span>
        <el-link type="primary" @click="openDialog(scope.row)">View</el-link>
      </template>
      
    </el-table-column>
      
  </el-table>


  <el-dialog
    title="Details"
    :visible.sync="dialog.show"
    width="70%"
    :before-close="closeDialog">
    <div v-if="dialog.info">
      <el-row v-for="(item, i) in dialog.info" :key="i" style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 15px;">
        <el-col :span="4">{{item.key}}</el-col>
        <el-col :span="20" v-html="item.value"></el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog.show = false">Close</el-button>
    </span>
  </el-dialog>


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
      table: [],
      dialog: {
        show: false,
        info: null,
      }
    };
  },
  methods: {
    handleSelectChange(val) {
      this.select = val;
    },
    gotoUpdate(item){
      const tea_id = _.slice(item.tea_id, 2).join('');
      this.$router.push('/update/'+tea_id);
    },
    closeDialog(){
      this.dialog.show = false;
      this.dialog.info = null;
    },
    openDialog(item){
      const list = [];
      list.push({
        key: 'Peer Id',
        value: item.peer_id
      });
      list.push({
        key: 'Tea Id',
        value: item.tea_id
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
        key: 'Manifest Cid',
        value: item.manifest_cid
      });
      list.push({
        key: 'Profile Cid',
        value: item.profileCid ? utils.forge.util.hexToBytes(item.profileCid) : ''
      });
      list.push({
        key: 'Status',
        value: item.status
      });
      list.push({
        key: 'Ra Nodes',
        value: _.map(item.raNodes, (arr)=>{
          return arr.join(' - ');
        }).join('<br />')
      });

      this.dialog.info = list;
      this.dialog.show = true;

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