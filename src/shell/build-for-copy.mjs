import * as help from './help';
import _ from 'lodash';

const Deploy = class {
  constructor(name){
    this.name = name;
  }
  async init(){
    this.json = await help.get_yaml(this.name);
    console.log(this.json)
  }
  async start(){
    const from = this.json.manifest;
    const to = `../builds/manifest.${this.name}.yaml`;

    await help.copy_file(from, to);

  }

}

const main = async ()=>{
  const tar = process.argv[2];
  const d = new Deploy(tar)
  await d.init();
  await d.start();
  console.log('---- copy manifest success ----');
}


main();