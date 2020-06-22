
import { ApiPromise, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

class Layer1 {
  constructor(){
    this.api = null;
  }
  async init(){
    const api = await ApiPromise.create({
      types: {
        Weight: "u32",
        Address: "AccountId",
        TeaId: "Bytes",
        PeerId: "Bytes",
        TaskIndex: "u32",
        Node: {
          "TeaId": "TeaId",
          "Peers": "Vec<PeerId>"
        },
        Model: {
          "account": "AccountId",
          "payment": "u32",
          "cid": "H256"
        },
        Task: {
          "delegate_node": "TeaId",
          "ref_num": "u32",
          "rsa_pub": "Bytes",
          "cap_cid": "Bytes",
          "model_cid": "Bytes",
          "data_cid": "Bytes",
          "payment": "u32"
        }
      }
    });
    this.api = api;
    await cryptoWaitReady();
  }

  async addNewTask({
    teaId, refNum, rsaPub, capCid, modelCid, dataCid, payment
  }, callback){
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

    await this.api.tx.tea.addNewTask(teaId, refNum, rsaPub, capCid, modelCid, dataCid, payment)
          .signAndSend(alice, ({ events = [], status }) => {
                if (status.isInBlock) {
                      console.log('Included at block hash', status.asInBlock.toHex());
                      console.log('Events:');
                      events.forEach(({ event: { data, method, section }, phase }) => {
                            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                      });
                } else if (status.isFinalized) {
                      console.log('Finalized block hash', status.asFinalized.toHex());

                      callback(true, status.asFinalized.toHex());
                }
    });

    console.log('send add_new_task tx')
  }
}


export default Layer1;

