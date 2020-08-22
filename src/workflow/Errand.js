import Layer1 from '../tea/layer1';
import utils from '../tea/utils';
import _ from 'lodash';
import ed25519 from '../shared/utility/ed25519';
import Log from '../shared/utility/Log';
import proto from '../tea/proto';
import http from '../tea/http';

const {Protobuf, stringToU8, u8ToString} = proto;

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


  constructor(){
    this.layer1 = null;
    
  }

  setLayer1Account(account){
    this.layer1_account = account;
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

    await this.initLayer1();
  }

  async initLayer1(){
    if(!this.layer1){
      try{
        this.layer1 = new Layer1();
        await this.layer1.init();

      }catch(e){
        console.error(e);
      }
    }
  }

  async requestBeMyDelegate(){
    if(!this.layer1_account){
      throw 'invalid layer1 account';
    }

    const pb = new Protobuf('actor_delegate.BeMyDelegateRequest');

    this.nonce = _.random(100000000).toString();

    pb.payload({
      layer1Account: stringToU8(this.layer1_account),
      nonce: stringToU8(this.nonce)
    });

    const buf = pb.encode();
    const buf_64 = utils.uint8array_to_base64(buf);
    log.d('BeMyDelegateRequest base64 = ', buf_64);

    const res = await http.requestBeMyDelegate(buf_64);
    log.d('BeMyDelegateRequest response ', res);

    // TODO post to delegator
    this.delegator_tea_id = _.get(res, 'delegator_tea_id');
    this.delegator_ephemeral_id = _.get(res, 'delegator_ephemeral_id');
    this.task_sign = _.get(res, 'sig');

    
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

  async start_task(){
    // step 1
    log.d('Step 1');
    await this.requestBeMyDelegate();

    // step 3
    log.d('Step 3');
    this.ed = ed25519.keypair();

    // step 4
    log.d('Step 4');
    await this.depositToAgentAccount();

    // step 7
    log.d('Step 7');
    

  }

}