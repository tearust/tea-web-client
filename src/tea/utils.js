import * as uuid from 'uuid';
import _ from 'lodash';
import http from './http';

const cache = {
  put(id, data) {
    localStorage.setItem(id, JSON.stringify(data));
  },
  get(id) {
    const d = localStorage.getItem(id);
    try{
      return JSON.parse(d);
    } catch(e){
      return d;
    }
  }
};

const crypto = {
  encode(data) {
    return data;
  },
  decode(data) {
    return data;
  }
};


let _http_base_url = '';
const F = {
  cache,
  crypto,
  getBootstrapNodes(){
    return '127.0.0.1:8000';
  },

  getHttpBaseUrl() {
    if(!_http_base_url){
      _http_base_url = F.getBootstrapNodes();
    }

    return `http://${_http_base_url}/`;
  },
  setHttpBaseUrl(url) {
    _http_base_url = url;
  },

  convertU8ToString(u8_array){
    return (_.map(u8_array, (x)=>String.fromCharCode(x))).join('');
  },

  uuid(){
    return uuid.v4();
  }
};

export default F;