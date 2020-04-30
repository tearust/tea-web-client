import * as uuid from 'uuid';

export default {
  getBootstrapNodes(){
    return [
      '127.0.0.1'
    ];
  },

  uuid(){
    return uuid.v4();
  },

  async requestForActiveNodes(node_list){
    // TODO use http to get active node list.
    // url/api/request_active_nodes
    // return : [{websocket, weight, public_key, nkn}]


    return new Promise((resolve)=>{
      resolve([
        {
          tea_id: 'tea_id',
          nkn_id: 'nkn_id',
          http: 'http://127.0.0.1:8000',
          ws: 'ws://127.0.0.1:8001', 
          ping: 'ping',
          credit: 0
        }
      ]);
    });
  }
};