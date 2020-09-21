
import POLKAPI from '@polkadot/api';
import POLK_UTIL from '@polkadot/util-crypto';
import _ from 'lodash';
import types from '../tea/types';
import rpc from '../tea/rpc';
import toHex from 'to-hex';
import BN from 'bn.js';
import fs from 'fs';

import axios from 'axios';

const MAIN_LIST = [
  {
    layer1_account: 'Alice',
    tea_id: 'df38cb4f12479041c8e8d238109ef2a150b017f382206e24fee932e637c2db7b',
    ipfs: 'http://127.0.0.1:8101'
  },
  {
    layer1_account: 'Bob',
    tea_id: 'c7e016fad0796bb68594e49a6ef1942cf7e73497e69edb32d19ba2fab3696596',
    ipfs: 'http://127.0.0.1:8102'
  },
  {
    layer1_account: 'Charlie',
    tea_id: '2754d7e9c73ced5b302e12464594110850980027f8f83c469e8145eef59220b6',
    ipfs: 'http://127.0.0.1:8103'
  },
  {
    layer1_account: 'Dave',
    tea_id: 'c9380fde1ba795fc656ab08ab4ef4482cf554790fd3abcd4642418ae8fb5fd52',
    ipfs: 'http://127.0.0.1:8104'
  }
];

const post_ipfs = async (ipfs_address, file_content) => {
  const _axios = axios.create({
    baseURL: ipfs_address
  });

  const res = await _axios.post('/ipfs-upload', file_content);
  
  const cid = res.data.data;
  // console.log(cid);
  return cid;
};


const { ApiPromise, Keyring, WsProvider } = POLKAPI;
const { cryptoWaitReady } = POLK_UTIL;
const keyring = new Keyring({ type: 'sr25519' })

const LAYER1_URL = 'ws://127.0.0.1:9944';
const log = console.log;

class Layer1Portal {
  constructor(){
    this.api = null;
  }
  async init(){
    const provider = new WsProvider(LAYER1_URL);
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


  async test(){
    const finish = [];
    _.each(MAIN_LIST, async (item)=>{
      const file_content = fs.readFileSync('../docker-output/tea-runtime/manifest.yaml', {
        encoding: 'utf-8'
      });
      const m_cid = await post_ipfs(item.ipfs, file_content);
    
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

        finish.push(1);
        if(finish.length === MAIN_LIST.length){
          process.exit(0);
        }
      });
      
      
    });
  }
};



const main = async ()=>{
  const lp = new Layer1Portal();
  log('start init tea layer1 node');
  await lp.init();
  await lp.test();

}

main();
