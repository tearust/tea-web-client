import Layer1 from '../tea/layer1';
import utils from '../tea/utils';


export default class {
  hash_of_task = null;
  proof_of_delegate = null;

  deployment_id_for_code = null;
  cid_of_code = null;

  deployment_id_for_data = null;
  cid_of_data = null;


  constructor(){
    this.hash_of_task = utils.get_env('hash_of_task');
  }

};