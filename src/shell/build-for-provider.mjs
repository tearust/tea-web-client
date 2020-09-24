import * as help from './help';
import _ from 'lodash';

const ROOT_PATH="../builds";
const PATH_1=`${ROOT_PATH}/debug`;
const LIST = [
  {
    name: 'libtea_tensorflow_provider',
    url: `${PATH_1}/libtea_tensorflow_provider.so`
  },
  {
    name: 'libtea_tpm_provider',
    url: `${PATH_1}/libtea_tpm_provider.so`
  },
  {
    name: 'libwascc_httpsrv',
    url: `${PATH_1}/libwascc_httpsrv.so`
  },
  {
    name: 'libtea_keyvalue_provider',
    url: `${PATH_1}/libtea_keyvalue_provider.so`
  },
  {
    name: 'libtea_nats_provider',
    url: `${PATH_1}/libtea_nats_provider.so`
  },
  {
    name: 'libwascc_log',
    url: `${PATH_1}/libwascc_log.so`
  },
  {
    name: 'libtea_env_provider',
    url: `${PATH_1}/libtea_env_provider.so`
  },
  {
    name: 'libtea_ipfs_provider',
    url: `${PATH_1}/libtea_ipfs_provider.so`
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
    for(let i=0, len=LIST.length; i<len; i++){
      const item = LIST[i];
      const cid = await help.post_file_to_ipfs(this.json.ipfs, item.url);
      help.replace_cid(item.name, cid, this.name);
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