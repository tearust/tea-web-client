import * as uuid from 'uuid';
import _ from 'lodash';

export default {
  getBootstrapNodes(){
    return [
      '127.0.0.1'
    ];
  },

  convertU8ToString(u8_array){
    return (_.map(u8_array, (x)=>String.fromCharCode(x))).join('');
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
          nkn_id: '3232323232323232.48075a597e721a156e2e0799de5cc0c5324dc6e7eaf1cdd46250868ec53215dd',
          http: 'http://127.0.0.1:8000',
          // ws: 'ws://127.0.0.1:8001', 
          ping: 'ping',
          credit: 0
        }

      ]);
    });
  }
};