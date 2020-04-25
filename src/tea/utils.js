

export default {
  getBootstrapNodes(){
    return [
      '127.0.0.1'
    ];
  },

  async requestForActiveNodes(node_list){
    // TODO use http to get active node list.
    // url/api/request_active_nodes
    // return : [{websocket, weight, public_key, nkn}]


    return new Promise((resolve)=>{
      resolve([
        {
          websocket: 'websocket_address',
          nkn: 'nkn_address',
          public_key: 'tea_public_key',
          weight: 1
        }
      ]);
    });
  }
};