<template>
<div class="tea-page" style="position:relative">

  
  <div class="">
    <h4>Tools</h4>
    <el-button @click="$router.push('register_node')" size="small" plain type="primary">Add New Node</el-button>
    <el-button @click="$router.push('test_block_get')" type="primary" size="small" plain>Trigger IPFS Block Get</el-button>
    <el-button @click="$router.push('search_node')" type="primary" size="small" plain>Search  Node</el-button>
  </div>

  <el-divider />
  <h4>Layer1 Node List</h4>

  <el-table
    :data="super_table"
    stripe
    border
    
    @current-change="handleSelectChange"
    style="width: 100%; margin-top: 40px;">
    <el-table-column prop="name" width="70px" label="Name"></el-table-column>
    <el-table-column prop="peer_id" width="130px" label="Peer ID"></el-table-column>
    <el-table-column prop="tea_id" label="TEA ID"></el-table-column>
    <el-table-column prop="http" label="HTTP"></el-table-column>
    <el-table-column prop="manifest_cid" label="Manifest Cid"></el-table-column>
    <el-table-column prop="status" width="70px" label="Status"></el-table-column>
    <el-table-column label="Action" width="120px">
      <template slot-scope="scope">
        <el-link type="primary" @click="gotoUpdate(scope.row)">Update</el-link>
        <span style="margin: 0 10px;">|</span>
        <el-link type="primary" @click="openDialog(scope.row)">View</el-link>
      </template>
      
    </el-table-column>
      
  </el-table>

  <el-divider />
  <el-table
    :data="table"
    stripe
    border
    
    @current-change="handleSelectChange"
    style="width: 100%; margin-top: 40px;">
    <el-table-column prop="peer_id" width="200px" label="Peer ID"></el-table-column>
    <el-table-column prop="tea_id" label="TEA ID"></el-table-column>
    <el-table-column prop="http" label="HTTP"></el-table-column>
    <el-table-column prop="manifest_cid" label="Manifest Cid"></el-table-column>
    <el-table-column prop="status" width="70px" label="Status"></el-table-column>
    <el-table-column label="Action" width="120px">
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
      <el-button style="float:left;" type="danger" @click="shut_down()">Shutdown</el-button>
      <el-button style="float:left;" type="primary" @click="back_up()">Backup</el-button>
      <el-button style="float:left;" type="primary" @click="restore()">Restore</el-button>

      <el-button style="float:left;" type="primary" @click="check_is_pinner()">Check_is_pinner</el-button>
      <el-button style="float:left;" type="primary" @click="list_delegated_tasks()">List_delegated_tasks</el-button>
      <el-button style="float:left;" type="primary" @click="list_executed_tasks()">List_executed_tasks</el-button>
      <el-button style="float:left;" type="primary" @click="list_pinned_resources()">List_pinned_resources</el-button>
      <el-button style="float:left;" type="primary" @click="list_ipfs_p2p_connections()">list_ipfs_p2p_connections</el-button>
      <el-button style="float:left;" type="primary" @click="repin_all_from_local()">repin_all_from_local</el-button>
      <el-button @click="dialog.show = false">Close</el-button>
    </span>
  </el-dialog>


</div>
</template>
<script>
import gov from './gov';
import utils from '../tea/utils';
import proto from '../tea/proto';
import _ from 'lodash';
import axios from 'axios';
export default {
  data(){
    return {
      select: null,
      super_table: [],
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

    },
    requestShutdownNode(tar, action){
      const _axios = axios.create({
        baseURL: tar
      });
      const url = '/admin/ipfs?action='+action;
      return _axios.post(url, {});
    },
    repinDeployment(tar, proto_buf_b64) {
      const _axios = axios.create({
        baseURL: tar
      });
      return _axios.post('/api/repin_deployment', proto_buf_b64);
    },
    requestAdapterDump(tar, sub_url){
      const _axios = axios.create({
        baseURL: tar
      });
      const url = '/dump/'+sub_url;
      return _axios.post(url, {});
    },
    requestListDeploymentResource(tar, sub_url) {
      const _axios = axios.create({
        baseURL: tar
      });
      const url = '/'+sub_url;
      return _axios.post(url, {});
    },
    repinSingleDeployment(element) {
        var payload = {
          deploymentId: element.deployment_id,
          dataCid: element.cid,
          descriptionCid: element.description,
        };

        if (!element.cap_checker && element.cap_checker.length > 0) {
          payload.capCid = element.cap_checker;
        }

        const p = new proto.Protobuf('actor_delegate.RepinDeploymentRequest');
        console.log('payload', payload);
        p.payload(payload);
        const buf = p.encode();
        const buf_64 = utils.uint8array_to_base64(buf);
        console.log('RepinDeploymentRequest base64 = ', buf_64);

        return this.repinDeployment(this.select.http, buf_64);
    },
    async shut_down(){
      // console.log(this.select);
      this.$root.loading(true);
      const res = await this.requestShutdownNode(this.select.http, 'internal.op.node.shutdown');
      console.log('shut_down\n', res);

      this.$root.loading(false);
      
    },

    async back_up(){
      this.$root.loading(true);
      const res = await this.requestShutdownNode(this.select.http, 'internal.op.deployment.backup.');
      console.log('back_up\n', res.data.data);

      this.$root.loading(false);
    },

    async restore(){
      this.$root.loading(true);
      const res = await this.requestShutdownNode(this.select.http, 'internal.op.deployment.restore.');
      console.log('restore\n', res.data.data);

      this.$root.loading(false);
    },

    async list_delegated_tasks(){
      this.$root.loading(true);
      const res = await this.requestShutdownNode(this.select.http, 'internal.op.debug.list_delegated_tasks');
      console.log('list_delegated_tasks\n', res.data.data);

      this.$root.loading(false);
    },

    async list_executed_tasks(){
      this.$root.loading(true);
      const res = await this.requestShutdownNode(this.select.http, 'internal.op.debug.list_executed_tasks');
      console.log('list_executed_tasks\n', res.data.data);

      this.$root.loading(false);
    },

    async list_pinned_resources(){
      this.$root.loading(true);
      const res = await this.requestShutdownNode(this.select.http, 'internal.op.debug.list_pinned_resources');
      console.log('list_pinned_resources\n', res.data.data);

      this.$root.loading(false);
    },

    async list_ipfs_p2p_connections(){
      this.$root.loading(true);
      const res = await this.requestAdapterDump(this.select.http, 'ipfs/p2p/connections');
      console.log('list_ipfs_p2p_connections\n', res.data.data);

      this.$root.loading(false);
    },

    async repin_all_from_local(){
      this.$root.loading(true);
      const res = await this.requestListDeploymentResource('http://localhost:8877', 'list_deployment_resources');
      console.log('list_deployment_resources\n', res.data);

      res.data.forEach(async element => {
        let dep_res = await this.repinSingleDeployment(element);   
        console.log('repin ', element.deployment_id, ' result: ', dep_res);
      });

      this.$root.loading(false);
    },

    async check_is_pinner(){
      const did = await prompt("input deployment id");
      if(!did){
        alert('invalid');
        return false;
      }

      this.$root.loading(true);
      const res = await this.requestShutdownNode(this.select.http, 'internal.op.deployment.is_pinner.'+did);
      console.log('is_pinner\n', res.data.data);

      this.$root.loading(false);
    }
  },
  created(){
    this.layer1 = null;
  },
  async mounted(){
    this.$root.loading(true);
    this.layer1 = await gov.buildLayer1();
    const tmp_list = await gov.getLayer1NodeList(this.layer1.api);

    const s_list = [];
    const list = [];
    const xxx = utils.bootstrapNodesList();
    const txx = _.keys(xxx);
    _.each(tmp_list, (item)=>{
      if(_.includes(txx, item.tea_id)){
        item.name = xxx[item.tea_id];
        s_list.push(item);
      }
      else{
        list.push(item);
      }
    });
    this.super_table = s_list;
    this.table = list;

    this.$root.loading(false);
  }
}
</script>