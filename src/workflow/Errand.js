import Layer1 from '../tea/layer1';
import utils from '../tea/utils';
import _ from 'lodash';
import ed25519 from '../shared/utility/ed25519';
import Log from '../shared/utility/Log';
import { util } from 'node-forge';

const log = Log.create('Errand');

export default class {
  deployed_code = null;
  deployed_data = null;
  
  layer1_account = null;
  nonce = null;

  delegator_tea_id = null;
  delegator_ephemeral_id = null;
  task_sign = null;

  ed = null;

  deposit_tx_id = null;


  constructor(opts){

    
  }

  async init(){
    const c = utils.get_env('CID_OF_CODE');
    const d = utils.get_env('CID_OF_DATA');
    if(c){
      this.deployed_code = {
        deployment_id: utils.get_env('DEPLOYMENT_ID_FOR_CODE'),
        cid: c
      };
    }
    if(d){
      this.deployed_data = {
        deployment_id: utils.get_env('DEPLOYMENT_ID_FOR_DATA'),
        cid: d
      };
    }
  }

  async requestToDelegator(){
    if(!this.layer1_account){
      throw 'invalid layer1 account';
    }

    this.nonce = _.random(100000000).toString();

    // TODO post to delegator
    this.delegator_tea_id = 'delegator_tea_id';
    this.delegator_ephemeral_id = 'delegator_ephemeral_id';
    this.task_sign = 'sign';

  }

  async depositToAgentAccount(){
    const payload = {
      delegator_tea_id: this.delegator_tea_id,
      delegator_emphemeral_id: this.delegator_emphemeral_id,
      sign: this.task_sign,
      amount: 10,
      public_key: this.ed.pub
    };
    // TODO send to layer1

    this.deposit_tx_id = 'deposit_tx_id';

  }


  async start(layer1_account){
    this.layer1_account = layer1_account;

    // step 1
    log.d('Step 1');
    await this.requestToDelegator();

    // step 3
    log.d('Step 3');
    this.ed = ed25519.keypair();

    // step 4
    log.d('Step 4');
    await this.depositToAgentAccount();

  }

};