import Layer1 from '../tea/layer1';
import utils from '../tea/utils';
import _ from 'lodash';

const F = {
  async buildLayer1(){
    const layer1 = new Layer1();
    await layer1.init();

    return layer1;
  },

  async getLayer1NodeList(api){
    const nodes = await api.query.tea.nodes.entries();
    const teaNodes = _.slice(nodes, 0, 100).map((n) => {
      return n[1]
    });

    const list = [];
    for (let i=0, len=teaNodes.length; i<len; i++){
      const t = teaNodes[i].toJSON();
      t.tea_id = t.teaId;
      t.http = t.urls[0] ? utils.forge.util.hexToBytes(t.urls[0]) : '';
      const cid_obj = await api.query.tea.manifest(t.teaId);
      t.manifest_cid = cid_obj.toJSON() ? utils.forge.util.hexToBytes(cid_obj.toJSON()) : '';
      t.peer_id = utils.forge.util.hexToBytes(t.peerId);
      list.push(t);
    }
    
    return list;
  },

  async updateManifest(layer1, layer1_account, tea_id, cid, cb){
    const teaId = '0x'+tea_id;
    // await extension.setSignerForAddress(layer1_account, api);
    const {api, extension} = layer1;
    layer1_account = layer1.getDefaultAccount();

    const next = async () => {
      await api.tx.tea.updateManifest(teaId, cid)
      .signAndSend(layer1_account, ({ events = [], status }) => {
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
    };

    next();
  },

  async addNewNode(layer1, layer1_account, tea_id, cid, cb){
    const teaId = '0x'+tea_id;
    // await extension.setSignerForAddress(layer1_account, api);
    const {api, extension} = layer1;
    layer1_account = layer1.getDefaultAccount();
    await api.tx.tea.addNewNode(teaId)
      .signAndSend(layer1_account, ({ events = [], status }) => {
        if (status.isInBlock) {
              console.log('Add new node with teaId ' + teaId)
              next();
            } else {
              console.log('Status of transfer: ' + status.type)
            }

            events.forEach(({ phase, event: { data, method, section } }) => {
              console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString())
            })
          });

    
    const next = async () => {
      await api.tx.tea.updateManifest(teaId, cid)
      .signAndSend(layer1_account, ({ events = [], status }) => {
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
    };
    

    
  },
  async nodeByEphemeralId(layer1, eid, cb){
    const {api} = layer1;
    const teaId = await api.query.tea.ephemeralIds('0x'+eid);
    if (teaId.isNone) {
      cb(false);
      return false;
    }

    const nodeObj = await api.query.tea.nodes(teaId.unwrap());
    const node = nodeObj.toJSON();
    console.log(111, node);

    node.http = node.urls[0] ? utils.forge.util.hexToBytes(node.urls[0]) : '';

    cb(true, node);
  }
};


export default F;