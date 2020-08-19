import forge from 'node-forge';
import _ from 'lodash';
import Log from './Log';

const map = {};
const log = Log.create('ED25519');

export default class {
  static keypair = ()=>{
    const seed = forge.random.getBytesSync(32);
    const tmp = forge.ed25519.generateKeyPair({seed});

    _.set(map, tmp.publicKey, tmp.privateKey);

    log.d('pub => ', forge.util.bytesToHex(tmp.publicKey));
    log.d('pri => ', forge.util.bytesToHex(tmp.privateKey));

    return {
      pub: forge.util.bytesToHex(tmp.publicKey),
      pri: forge.util.bytesToHex(tmp.privateKey)
    };
  };
};