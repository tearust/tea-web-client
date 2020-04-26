import utils from './utils';
import nkn from './nkn';
import ws from './ws';

export default class {
  constructor(){
    this.ready = 0;

    this.nkn = null;
    this.active_nodes = [];
  }

  async connect(){
    if(this.ready > 0) return false;
    this.ready = 1;

    // init nkn client to connect nkn network
    this.nkn = new nkn();
    this.ws = new ws();

    const bootstrap_nodes = utils.getBootstrapNodes();
    const active_nodes = await utils.requestForActiveNodes(bootstrap_nodes);
    this.active_nodes = this.sortActiveNodes(active_nodes);
    
    this.ready = 2;
    console.log('tea connect success');
  }

  sortActiveNodes(node_list){
    // TODO sort by weight

    return node_list;
  }

  async sendTask({me_pub_key, gas_fee, wasm_file}){
    const node = this.active_nodes[0];

    const payload = {
      public_key: me_pub_key,
      gas: gas_fee,
      wasm: wasm_file
    };

    let rs = null;
    if(node.websocket){
      rs = await this.ws.sendTask(payload);
    }
    else if(node.nkn){
      rs = await this.nkn.sendTask(payload);
    }
    else{
      throw 'active node is invalid';
    }

    console.log("rs => ", rs);
    return rs;
  }

}