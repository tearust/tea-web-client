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
    // return [
    //   {
    //     "tea_id": "c7e016fad0796bb68594e49a6ef1942cf7e73497e69edb32d19ba2fab3696596",
    //     "nkn_id": "nkn_id",
    //     "http": "http://127.0.0.1:8000",
    //     "rsa": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQUxpV0pYYkxwYXlLL0hmQXFVRnVCOEUvdCtEQlFQUkgNCmFpQWRleFF6ODludThXSlJJUDc2QUJWdHdOeHN3WTNKZnZTVTMrcEkzaUhRem9LWEp0WTYxaVVDQXdFQUFRPT0NCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ0K",
    //     "ping": "",
    //     "ws": "ws://127.0.0.1:8001",
    //     "credit": 0,
    //     "update_time": ""
    //   },
    // ]
  },
  putToIpfs(data) {
    return _axios.post('/ipfs', data);
  },
  registerNewTask(proto_buf){
    return _axios.post('/api/register_task', proto_buf);
  },


  registerData(proto_buf_b64){
    // TODO

    return new Promise((resolve)=>{
      resolve({
        rsa_pub_key: 'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQTc2anNHZEJUUlJONW1XakZhUldqTkdXMG5sdENEazZlY215RzRYcDNVTk82cnUxZlRpVDAKaFJ3WEZralFwN3FtQUt3dDk0MVduVWNrYWNuT1VMMWJldHY5OW1sZjhLRjRoNDZZcHZ4ZnlnRExmWVEyekVwcgpzdE5kcUpWS3I0NHo3dDRDNGRJVzQydTN0VFBTeVI0NytENjhnQ0cxNnNMR2p6eEQvVFJMNnhlRUFFWUxMWURGClc0TXNmbE5zYTRlT3psa0xJWW1qTGNJTmN0aGVnbEtMWTlRN1h2TVlmZWxHb2x0VEticjJJRUVMbUFaa0tJaU8KYWNUdXJYbnFXaFNsdk1TZTBORCt0ai9oQnVPUHZoK1FrZDNBNkxQM09JcE1UdTVqRktwRm5WN1lCczRHcFhZNApQaWdBSy9rRVMwV1F6ZHoyOVFqNWFGb09GS0Q4WUdlWnh3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K'
      });
    });
  },

  postDataWithRsaKey(data, ekey1, rsa_pub_key){
    // TODO
    // const url = `/api/post_data?ekey1=${ekey1}&rsa_key=${rsa_pub_key}`;

    return new Promise((resolve)=>{
      resolve({
        code: 1,
        msg: 'ok'
      });
    });
  }
};


export default F;