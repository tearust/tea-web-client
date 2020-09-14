import http from '../tea/http';
import _ from 'lodash';
import utils from '../tea/utils';
import Log from '../shared/utility/Log';

const log = Log.create('Deploy Helper');

export default class {
  // static 
  static queryTaskResult = async (session_id, cb)=>{
    let deployment_id = null;

    let n = 1;
    const MAX = 10;

    const res_1 = await http.query_deployment_id_by_session_id(session_id);
    log.d('query_deployment_id_by_session_id response', res_1);
    deployment_id = utils.forge.util.decode64(res_1.deployment_id);
    cb(1, {
      deployment_id,
    });

    const res_2 = await http.start_query_pinners_by_deployment_id(deployment_id);
    log.d('start_query_pinners_by_deployment_id response', res_2);

    cb(2, {

    });

    let peers_list = [
      'Jacky mock peer_id',
    ];
    const loop = async ()=>{
      const res_3 = await http.query_pinners_by_deployment_id(deployment_id);
      log.d('query_pinners_by_deployment_id response', res_3);

      const list = res_3.peers;
      peers_list = _.concat(list, peers_list)

      cb(3, {
        peers: peers_list
      });

      if(n > MAX){
        cb(4, {});
        return false;
      }
      n++;
      _.delay(async ()=>{
        await loop();
      }, 5000);
    };

    await loop();
  }
}