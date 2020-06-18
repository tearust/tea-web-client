import * as uuid from 'uuid';
import _ from 'lodash';
import http from './http';

import forge from 'node-forge';
window.forge = forge;

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


let _secret = {
  key : null,
  iv : null,
  hex : null
};
const crypto = {
  get_secret(input_key){
    if(!_secret.key){
      const __key = localStorage.getItem('crypto-secret-key');
      const key = input_key || __key || forge.random.getBytesSync(16);
      // const key = forge.random.generateSync(16);
      const iv = key;
      const hex = forge.util.bytesToHex(key);

      localStorage.setItem('crypto-secret-key', key);

      _secret = {
        key, iv, hex
      };
    }
    return _secret;
  },
  encode(buffer_data) {
    const {key, iv} = crypto.get_secret();
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(buffer_data));
    cipher.finish();
    const encrypted = cipher.output;

    // console.log(encrypted.toHex());
    return encrypted.toHex();
  },
  decode(hex) {
    const {key, iv} = crypto.get_secret();
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({iv: iv});
    const encryptedBytes = forge.util.hexToBytes(hex);
    const length = encryptedBytes.length;

    const chunkSize = 1024 * 64;
    let index = 0;
    let decrypted = '';
    do {
      decrypted += decipher.output.getBytes();
      const buf = forge.util.createBuffer(encryptedBytes.substr(index, chunkSize));
      decipher.update(buf);
      index += chunkSize;
    } while(index < length);
    decipher.finish();
    decrypted += decipher.output.getBytes();
    return decrypted;
  },

  encodeWithOtherKey(data, other_key="df38cb4f12479041c8e8d238109ef2a150b017f382206e24fee932e637c2db7b"){
    const key = forge.util.hexToBytes(other_key);
    const iv = key;
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(data));
    cipher.finish();

    return cipher.output.toHex();
  }
};


let _http_base_url = '';
const F = {
  cache,
  crypto,
  forge,
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