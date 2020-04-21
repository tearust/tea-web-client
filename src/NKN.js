import nkn from 'nkn-sdk';

export default class {
   
  start(){
    let client = new nkn.Client({
      seed: 'be41c153203a9c73c93d00afebbc59d39b28cd03ba5d483d7debbf4e3697a170'
    });

    window.client = client;
    console.log(client.getSeed(), client.getPublicKey());

    client.onMessage(({ src, payload }) => {
      console.log('Receive message', payload, 'from', src);
    });

    client.onConnect(() => {
      console.log('Client ready.');

      // 4967fdae22abab19bee2bebd58bfcbc180b311ea7ac72bc6aea8170b001f3388
      client.send(
        '4967fdae22abab19bee2bebd58bfcbc180b311ea7ac72bc6aea8170b001f3388',
        "aaaa"
      ).then((reply)=>{
        console.log('Receive reply:', reply);
      });

      
    });

  }
}