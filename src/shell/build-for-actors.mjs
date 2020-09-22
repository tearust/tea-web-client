import * as help from './help';
import _ from 'lodash';

const ACTOR_LIST = [
  {
    name: 'ra',
    url: '../tea-actors/ra/target/wasm32-unknown-unknown/release/tea_ra_signed.wasm'
  },
  {
    name: 'delegate',
    url: '../tea-actors/delegate/target/wasm32-unknown-unknown/release/tea_actor_delegate_signed.wasm'
  },
  {
    name: 'executor',
    url: '../tea-actors/executor/target/wasm32-unknown-unknown/release/tea_actor_executor_signed.wasm'
  }
];


const Deploy = class {
  constructor(name){
    this.name = name;
  }
  async init(){
    this.json = await help.get_json(this.name);
    
  }
  async start(){
    _.each(ACTOR_LIST, async (item)=>{
      const cid = await help.post_file_to_ipfs(this.json.ipfs, item.url);
      help.replace_cid(item.name, cid, this.name);
    });

  }

}

const main = async ()=>{
  const tar = process.argv[2];
  const d = new Deploy(tar)
  await d.init();
  await d.start();
  console.log('---- build for actors success ----');
}


main();