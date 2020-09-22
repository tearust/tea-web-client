
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
    this.json = await help.get_json(this.name);
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
    const ac = keyring.addFromUri(`//${item.layer1_account}`, { name: `${item.layer1_account} default` });
    const teaId = '0x'+item.tea_id;
    await this.api.tx.tea.updateManifest(teaId, manifestCid)
      .signAndSend(ac, ({ events = [], status }) => {
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
    const file_content = fs.readFileSync(`../builds/manifest.${this.name}.yaml`, {
      encoding: 'utf-8'
    });
    const m_cid = await help.post_ipfs(this.json.ipfs, file_content);

    const item = this.json;
    await this.updateManifest(item, m_cid, async ()=>{
      const teaId = '0x'+item.tea_id;
      const nodeObj = await this.api.query.tea.manifest(teaId);
    
      if (nodeObj.isNone) {
        console.log('No such node found')  
      }
      let cid = nodeObj.toJSON();
      cid = Buffer.from(cid.slice(2), 'hex');
      console.log('');
      console.log('layer1 account => '+item.layer1_account);
      console.log('tea id => '+item.tea_id);
      console.log('manifest cid => '+cid);
      console.log('');

      cb();
      process.exit(0);
    });
  }
};



const main = async ()=>{
  const tar = process.argv[2];
  const d = new Deploy(tar);
  await d.init();
  await d.start(()=>{
    console.log('---- build for layer1 success ----');
  });
}

main();
