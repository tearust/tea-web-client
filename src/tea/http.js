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
        console.log(111, res.data);
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
  },
  putToIpfs(crpyto_str) {
    return _axios.post('/ipfs', crpyto_str);
  },
  registerNewTask(proto_buf){
    return _axios.post('/api/register_task', proto_buf);
  }
};


export default F;