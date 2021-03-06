
import POLKAPI from '@polkadot/api';
import POLK_UTIL from '@polkadot/util-crypto';
import _ from 'lodash';
import types from '../tea/types';
import rpc from '../tea/rpc';
import fs from 'fs';

import * as help from './help';

const { ApiPromise, Keyring, WsProvider } = POLKAPI;
const { cryptoWaitReady } = POLK_UTIL;
const keyring = new Keyring({ type: 'sr25519' })

class Deploy {
  constructor(name){
    this.name = name;
  }
  async init(){
    this.json = await help.get_yaml(this.name);
    const provider = new WsProvider(this.json.layer1_url);
    const api = await ApiPromise.create({
      provider,
      types,
      rpc,
    });
    this.api = api;

    await cryptoWaitReady();
  }
  async add_new_node(item){
    const ac = keyring.addFromUri(`//${item.layer1_account}`, { name: `${item.layer1_account} default` });
    const teaId = toHex(item.tea_id, { addPrefix: true });
    console.log(ac, teaId);
    await this.api.tx.tea.addNewNode(teaId)
      .signAndSend(ac, ({ events = [], status }) => {
        if (status.isInBlock) {
          console.log('Add new node with teaId ' + teaId)
        } else {
          console.log('Status of transfer: ' + status.type)
        }

        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString())
        })
      })
  }

  async updateManifest(item, manifestCid, cb){
    console.log("updating manifest.., item.", item, manifestCid);
    const ac = keyring.addFromUri(`//${item.layer1_account}`, { name: `${item.layer1_account} default` });
    const teaId = '0x'+item.tea_id;
    console.log("teaId", teaId);
    await this.api.tx.tea.updateManifest(teaId, manifestCid)
      .signAndSend(ac, ({ events = [], status }) => {
        console.log("signAndSend...");
        if (status.isInBlock) {
          console.log('Included at block hash', status.asInBlock.toHex())
          console.log('Events:')
          events.forEach(({ event: { data, method, section }, phase }) => {
            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString())
          })
        } else if (status.isFinalized) {
          console.log('Finalized block hash', status.asFinalized.toHex());

          cb();
        }
      });
  
  }


  async start(cb){
    console.log(`Reading ../builds/manifest.${this.name}.yaml` );

    const file_content = fs.readFileSync(`../builds/manifest.${this.name}.yaml`, {
      encoding: 'utf-8'
    });

    for (let i=0, len=this.json.target.length; i<len; i++){
      const item = this.json.target[i];

      const m_cid = await help.post_ipfs(item.ipfs_url, file_content);
      await this.updateManifest({
        tea_id: item.tea_id,
        layer1_account: this.json.layer1_account
      }, m_cid, async ()=>{
        const teaId = '0x'+item.tea_id;
        const nodeObj = await this.api.query.tea.manifest(teaId);
      
        if (nodeObj.isNone) {
          console.log('No such node found')  
        }
        let cid = nodeObj.toJSON();
        cid = Buffer.from(cid.slice(2), 'hex');
        console.log('');
        console.log('layer1 account => '+this.json.layer1_account);
        console.log('tea id => '+item.tea_id);
        console.log('manifest cid => '+cid);
        console.log('');

        if(i === len-1){
          cb();
          process.exit(0);
        }

      });
    }

  }
};



const main = async ()=>{
  console.log("build for layer1 started");
  const tar = process.argv[2];
  const d = new Deploy(tar);
  await d.init();
  await d.start(()=>{
    console.log('---- build for layer1 success ----');
  });
}

main();
