import utils from './utils';
import nkn from './nkn';
import ws from './ws';

export default class {
  constructor(){
    this.ready = 0;

    this.nkn = null;
    this.ws = null;
    this.active_nodes = [];
  }

  async connect(){
    if(this.ready > 0) return false;
    this.ready = 1;
    

    const bootstrap_nodes = utils.getBootstrapNodes();
    const active_nodes = await utils.requestForActiveNodes(bootstrap_nodes);
    this.active_nodes = this.sortActiveNodes(active_nodes);

    this.channel = this.configChannelByActiveNode(this.active_nodes[0]);
    
    await this.createMessageChannel();
    this.ready = 2;
    console.log('tea connect success');
  }

  sortActiveNodes(node_list){
    // TODO sort by weight

    return node_list;
  }

  configChannelByActiveNode(info){
    const rs = {};
    if(info.ws){
      rs.type = 'ws';
      rs.address = info.ws;
    }
    else if(info.nkn_id){
      rs.type = 'nkn';
      rs.address = info.nkn_id;
    }
    else{
      console.log(info);
      throw 'invalid active node';
    }

    return rs;
  }

  async createMessageChannel(){
    if(this.channel.type === 'ws'){
      this.ws = new ws(this.channel.address);
    }
    else {
      this.nkn = new nkn();
    }
  }

  async sendTask({public_key, gas, wasm}){
    const node = this.active_nodes[0];

    const param = {
      public_key,
      gas,
      wasm,
      nonce: utils.uuid(),
    };

    const payload = {
      __tea_subject: 'api.wasm_task',
      __tea_object: param
    };

    console.log(11, payload);

    let rs = null;
    if(this.channel.type === 'ws'){
      rs = await this.ws.sendTask(payload);
    }
    else if(this.channel.type === 'nkn'){
      rs = await this.nkn.sendTask(payload);
    }
    else{
      throw 'active node is invalid';
    }

    console.log("rs => ", rs);
    return rs;
  }

}