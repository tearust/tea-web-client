import * as help from './help';
import _ from 'lodash';



const Deploy = class {
  constructor(name){
    this.name = name;
  }
  async init(){
    this.json = await help.get_yaml(this.name);
    
  }
  async start(){
    const LIST = [];
    _.each(this.json.providers, (val, key)=>{
      LIST.push({
        name: key,
        url: val
      });
    });
    if(LIST){
      for(let i=0, len=LIST.length; i<len; i++){
        const item = LIST[i];
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
  console.log('---- build for provider success ----');
}


main();