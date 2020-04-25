import sdk from 'nkn-sdk';

export default class {

  constructor(seed){
    this.client = new sdk.Client({
      seed
    });

    this.seed = this.client.getSeed();
    this.publicKey = this.client.getPublicKey();

    this.ready = 0;

    this.init();
  }

  init(){
    if(this.ready > 0) return false;
    this.ready = 1;


    this.client.onMessage(({ src, payload }) => {
      console.log('Receive message', payload, 'from', src);
    });

    this.client.onConnect(()=>{
      this.ready = 2;
    });
  }

  send(target, payload, callback){
    if(this.ready < 2){
      throw 'nkn not ready, please wait.';
    }

    this.client.send(target, JSON.stringify(payload)).then((reply)=>{
      console.log('Receive reply:', reply);
      callback && callback.call(this.client, reply);
    });
  }

  async sendTask(payload){
    // TODO
  }
   
}