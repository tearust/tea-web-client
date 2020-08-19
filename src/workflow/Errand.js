import Layer1 from '../tea/layer1';
import utils from '../tea/utils';
import _ from 'lodash';
import ed25519 from '../shared/utility/ed25519';


export default class {
  // hash_of_task = null;
  // proof_of_delegate = null;

  // deployment_id_for_code = null;
  // cid_of_code = null;

  // deployment_id_for_data = null;
  // cid_of_data = null;

  layer1_account = null;
  nonce = null;

  delegator_tea_id = null;
  delegator_ephemeral_id = null;
  task_sign = null;

  ed = null;

  deposit_tx_id = null;


  constructor(opts){
    this.hash_of_task = utils.get_env('hash_of_task');

    this.layer1_account = opts.layer1_account;
  }

  async init(){

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


  async start(){
    // step 1
    await this.requestToDelegator();

    // step 3
    this.ed = ed25519.keypair();

    // step 4
    await this.depositToAgentAccount();

  }

};