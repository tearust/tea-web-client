import * as uuid from 'uuid';
import _ from 'lodash';
import http from './http';
import CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';

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


const _secret = '__secret_password__';
const crypto = {
  get_secret(){
    return _secret;
  },
  encode(data) {
    const tmp = CryptoJS.AES.encrypt(data, _secret).toString();
    return {
      code: tmp,
      hash: SHA256(tmp).toString()
    };
  },
  decode(data) {
    const bytes  = CryptoJS.AES.decrypt(data, _secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};


let _http_base_url = '';
const F = {
  cache,
  crypto,
  getBootstrapNodes(){
    return 'http://127.0.0.1:8000';
  },

  getHttpBaseUrl() {
    if(!_http_base_url){
      _http_base_url = F.getBootstrapNodes();
    }

    return _http_base_url;
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