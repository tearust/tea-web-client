import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import utils from '../tea/utils';
import proto from '../tea/proto';
import http from '../tea/http';
import Layer1 from '../tea/layer1';
import _ from 'lodash';

import toHex from 'to-hex';
import BN from 'bn.js';

import Log from '../shared/utility/Log';
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/css.js';

import jsyaml from 'js-yaml';

const log = Log.create('Layer1 Portal');

const keyring = new Keyring({ type: 'sr25519' })

const MAIN_LIST = [
  {
    layer1_account: 'Alice',
    tea_id: 'df38cb4f12479041c8e8d238109ef2a150b017f382206e24fee932e637c2db7b',

  }
];


const parseYamlFn = (str) => {
  let isYaml = false;
  let errorMessage = '';
  try {
    isYaml = !!jsyaml.load(str)
  } catch(e) {
    errorMessage = e && e.message;
  }
  return {
    isYaml, errorMessage
  };
}

export default class {
  constructor(yaml_el){
    this.el = yaml_el;
    this.layer1 = null;
    this.layer1_api = null;

    this.cm = null;
  }
  async init(){
    if (!this.layer1) {
      try {
        this.layer1 = new Layer1();
        await this.layer1.init();
        this.layer1_api = this.layer1.api;

      } catch (e) {
        console.error(e);
      }
    }

    this.cm = codemirror(this.el, {
      value: '',
      mode: 'yaml',
      lineNumbers: true,     // 显示行数
      indentUnit: 1,         // 缩进单位为2
      styleActiveLine: true, // 当前行背景高亮
      matchBrackets: true,   // 括号匹配
      lineWrapping: true,    // 自动换行
      tabSize: 2,
    });

    
  }

  async add_new_node(item){
    const ac = keyring.addFromUri(`//${item.layer1_account}`, { name: `${item.layer1_account} default` });
    const teaId = toHex(item.tea_id, { addPrefix: true });
    
    await this.layer1_api.tx.tea.addNewNode(teaId)
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

  async addTeaNode(){
    const yaml = this.cm.getValue();
    console.log(111, this.cm, yaml);
    _.each(MAIN_LIST, async (item)=>{
      // add new node
      await this.add_new_node(item);
    });
  }


}