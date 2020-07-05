
import { ApiPromise, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import _ from 'lodash';

class Layer1 {
  constructor(){
    this.api = null;
  }
  async init(){
    const api = await ApiPromise.create({
      types: {
        Weight: "u32",
        Address: "AccountId",
        TeaId: "[u8; 32]",
        PeerId: "Bytes",
        RefNum: "H256",
        Result: "Bytes",
        Node: {
              "teaId": "TeaId",
              "peers": "Vec<PeerId>"
        },
        Model: {
              "account": "AccountId",
              "payment": "u32",
              "cid": "Bytes"
        },
        Task: {
              "refNum": "RefNum",
              "delegateTeaId": "TeaId",
              "modelCid": "Bytes",
              "bodyCid": "Bytes",
              "payment": "Balance"
        }
      }
    });
    this.api = api;
    await cryptoWaitReady();

    // Subscribe to system events via storage
    this.api.query.system.events((events) => {
      this.handle_events(events)
    });
  }

  handle_events(events){

    _.each(events, (record) => {
      // console.log(123, record);
      const { event, phase } = record;
      const types = event.typeDef;

      if (event.section == 'tea') {
        console.log(`Received tea events:`);
  
        let eventData = {}
        // Loop through each of the parameters, displaying the type and data
        event.data.forEach((data, index) => {
          // console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
          eventData[types[index].type] = data
        });
        console.log('eventData:', JSON.stringify(eventData));
  
        switch (event.method) {
          case 'CompleteTask':
            console.log(11111, event, eventData);

            console.log('CompleteTask:', JSON.stringify(eventData.RefNum));
            
            break
          default:
        }
      }
    });
  }

  async addNewTask({
    refNum, teaId, modelCid, bodyCid, payment
  }, callback){
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

    await this.api.tx.tea.addNewTask(refNum, teaId, modelCid, bodyCid, payment)
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

