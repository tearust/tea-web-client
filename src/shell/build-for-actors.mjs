import * as help from './help';
import _ from 'lodash';

const ACTOR_LIST = [
  {
    name: 'delegate',
    url: '../tea-actors/delegate/target/wasm32-unknown-unknown/release/tea_actor_delegate_signed.wasm'
  },
  {
    name: 'executor',
    url: '../tea-actors/executor/target/wasm32-unknown-unknown/release/tea_actor_executor_signed.wasm'
  },
  {
    name: 'ra',
    url: '../tea-actors/ra/target/wasm32-unknown-unknown/release/tea_ra_signed.wasm'
  }
];


const Deploy = class {
  constructor(name){
    this.name = name;
  }
  async init(){
    this.json = await help.get_yaml(this.name);
  }
  async start(){
    const ACTOR_LIST = [];
    _.each(this.json.actors, (val, key)=>{
      ACTOR_LIST.push({
        name: key,
        url: val
      });
    });

    if(ACTOR_LIST){
      for (let i=0, len=ACTOR_LIST.length; i<len; i++){
        const item = ACTOR_LIST[i];

        const ipfs_list = _.map(this.json.target, (x)=>x.ipfs_url);
        let cid = null;
        for (let j=0, len=ipfs_list.length; j<len; j++){
          cid = await help.post_file_to_ipfs(ipfs_list[j], item.url);
        }
        console.log("\n*** Tell other nodes to upload their manifest file's cid:\n*    file:", item.name, "\n*    cid:", cid, "\n****\n");
        help.replace_cid(item.name, cid, this.name);
      }
    }
    

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