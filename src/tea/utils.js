import * as uuid from 'uuid';
import _ from 'lodash';
import http from './http';
import proto from './proto';

import forge from 'node-forge';

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
  },

  saveNode(node) {
    cache.put('select-node', node);
  },
  getNode(){
    const node = cache.get('select-node');
    if(!node) return null;
    crypto.set_rsa_publickey(node.rsa);

    return node;
  }
};


const _secret = {
  key : null,
  iv : null,
  hex : null,

  rsa_key: null,
  key_encrypted: null
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

      _secret.key = key;
      _secret.iv = iv;
      _secret.hex = hex;
    }
    return _secret;
  },

  set_rsa_publickey(rsa_key){
    delete _secret.rsa_key;
    if(!_secret.rsa_key){
      crypto.get_secret();
      _secret.rsa_key = rsa_key;

      console.log(222, _secret.hex);
      _secret.key_encrypted = crypto.rsaEncodeWithRsaPublickKey(_secret.hex, _secret.rsa_key);
    }
  },

  encode(buffer_data) {
    const {key, iv} = crypto.get_secret();
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({iv: iv});
    console.log(111, forge.util.createBuffer(key));
    cipher.update(forge.util.createBuffer(buffer_data));
    // console.log(111, forge.util.createBuffer(buffer_data))
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

  // rsa encode with RSA_PUBLICKEY from step 1
  rsaEncodeWithRsaPublickKey(data, ras_pub){
    const tmp = forge.util.decode64(ras_pub);
    const pub = forge.pki.publicKeyFromPem(tmp);

    let rs = pub.encrypt(data);
    return forge.util.encode64(rs);
  },

  sha256(data){
    const tmp = forge.sha256.create();
    tmp.update(data);
    return tmp.digest().toHex();
  }
};


let _http_base_url = '';
const F = {
  cache,
  crypto,
  proto,
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
  },

  uint8array_to_arraybuffer(uint8){
    return uint8.buffer.slice(uint8.byteOffset, uint8.byteOffset + uint8.byteLength);
  },
  uint8array_to_base64(uint8){
    return proto.protobuf.util.base64.encode(uint8, uint8.byteOffset, uint8.byteOffset + uint8.byteLength);
  }
};

window.utils = F;
export default F;