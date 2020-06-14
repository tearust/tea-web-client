import axios from 'axios';
import _ from 'lodash';
import utils from './utils';

let _axios = null;
const init = ()=>{
  const baseUrl = utils.getHttpBaseUrl();

  _axios = axios.create({
    baseURL: baseUrl
  
  });

  _axios.interceptors.response.use((res)=>{
    console.log('[http response]', res.data);
    if(res.data){
      if(res.data.data){
        try{
          return Promise.resolve(JSON.parse(res.data.data));
        }catch(e){
          return res.data.data;
        }
      }
      return Promise.resolve(res.data);
    }
  }, (error)=>{
    return Promise.reject(error);
  });
}

const F = {
  initBaseUrl: init,
  requestActiveNodes() {
    return _axios.get('/api/request_active_nodes');

    // return new Promise((resolve)=>{
    //   resolve([
    //     {
    //       tea_id: 'tea_id',
    //       nkn_id: '3232323232323232.48075a597e721a156e2e0799de5cc0c5324dc6e7eaf1cdd46250868ec53215dd',
    //       http: 'http://127.0.0.1:80',
    //       ws: 'ws://127.0.0.1:8001', 
    //       ping: 'ping',
    //       credit: 0
    //     }
    //   ]);
    // });
  },
  putToIpfs(crpyto_str) {
    return _axios.post('/ipfs', crpyto_str);
  }
};


export default F;