
import axios from 'axios';
import fs from 'fs';
import child_process from 'child_process';

export const post_ipfs = async (ipfs_address, file_content) => {
  const _axios = axios.create({
    maxContentLength: Infinity,
    baseURL: ipfs_address
  });
  console.log("ready to call ipfs-upload ", ipfs_address);
  const res = await _axios.post('/ipfs-upload', file_content);
  
  const cid = res.data.data;
  // console.log(cid);
  return cid;
};

export const post_file_to_ipfs = async (ipfs_address, url) => {
  const file_u8 = fs.readFileSync(url, {});
  const cid = await post_ipfs(ipfs_address, file_u8);
  return cid;
};

export const get_json = async (name) => {
  const json = fs.readFileSync('../tea-docker-node/docker-machine/'+name+'.json', {
    encoding: 'utf-8'
  });

  return (new Function("return "+json))();
};

export const replace_cid = async (name, cid, tar_name) => {
  const spawn = child_process.spawn;
  //sed -i "" 's/^.*ra=.*$/  - '${ra_str}'/' $TARGET_PATH

  const str = `${name}=${cid}`;
  const child = spawn('sed', [
    '-i',
    '',
    `s/^.*${name}=.*$/  - ${str}/`,
    `../builds/manifest.${tar_name}.yaml`
  ]);
  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });
};
