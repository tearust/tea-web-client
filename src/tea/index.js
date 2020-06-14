import utils from './utils';
import nkn from './nkn';
import ws from './ws';

export default class {
  constructor(active_nodes){
    this.ready = 0;

    this.nkn = null;
    this.ws = null;
    this.active_nodes = [active_nodes];
  }

  async connect(){
    if(this.ready > 0) return false;
    this.ready = 1;
    

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
      this.nkn = new nkn(null, this.channel.address);
    }
  }

  async sendTask(task_param){

    const param = {
      ...task_param,
      nonce: utils.uuid(),
    };

    const payload = {
      __tea_subject: 'api.actor_task',
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