
import axios from 'axios';
import fs from 'fs';
import child_process from 'child_process';
import yaml from 'js-yaml';
import ipfs from 'ipfs';

export const post_ipfs = async (ipfs_address, file_content, type) => {
  const local_cid = await get_content_cid(file_content);
  console.log('file local cid is => ', local_cid);

  // if(type === 'provider') return local_cid;

  // check remote server exist cid or not.
  try{
    const flag = await remote_exist(ipfs_address, local_cid);

    if(flag){
      console.log('Remote server had this cid, ignore uploaded.');
      return local_cid;
    }
  }catch(e){
    console.error(e.toString());
  }

  const _axios = axios.create({
    maxContentLength: Infinity,
    baseURL: ipfs_address
  });
  console.log("uploading size: ", file_content.length);
  const res = await _axios.post('/ipfs-upload', file_content);
  const cid = res.data.data;
  console.log("uploaded and got the cid", cid);

  return cid;
};

export const remote_exist = async (ipfs_address, cid) => {
  const _axios = axios.create({
    baseURL: ipfs_address
  });
  const res = await _axios.get('/api/is_block_local?'+cid);
  const rs = res.data.data;
  const b = new Function('return '+rs.toString());
  return b();
}

export const get_content_cid = async (file_content_u8) => {
  const hash = await ipfs.multihashing(file_content_u8, 'sha2-256');
  const cid = new ipfs.CID(0, 'dag-pb', hash);

  return cid.toString();
};

export const post_file_to_ipfs = async (ipfs_address, url, type='actor') => {
  const file_u8 = fs.readFileSync(url, {});
  console.log("Reading file prepare for uploading, ", url, file_u8.length);
  const cid = await post_ipfs(ipfs_address, file_u8, type);
  return cid;
};

export const get_json = async (name) => {
  const json = fs.readFileSync('../tea-docker-node/docker-machine/'+name+'.json', {
    encoding: 'utf-8'
  });

  return (new Function("return "+json))();
};
export const get_yaml = async (name) => {
  const content = fs.readFileSync('../tea-docker-node/docker-machine/'+name+'.yaml', {
    encoding: 'utf-8'
  });

  return yaml.safeLoad(content);
}

export const copy_file = async (from, to) => {
  const spawn = child_process.spawn;
  const child = spawn('cp', [
    '-r',
    from,
    to
  ]);
  child.stdout.on('data', function(data) {
    // console.log(`stdout: ${data}`);
  });
  child.stderr.on('data', function(data){
    console.error(`stderr: ${data}`);
  });
}

export const replace_cid = async (name, cid, tar_name) => {
  // console.log("inside replace_cid: ", name, cid, tar_name);
  const spawn = child_process.spawn;
  //sed -i "" 's/^.*ra=.*$/  - '${ra_str}'/' $TARGET_PATH

  const str = `${name}=${cid}`;
  // console.log("sed ", name, str, tar_name);
  // console.log([
  //   'sed',
  //   '-i',
  //   '""',
  //   `s/^.*${name}=.*$/  - ${str}/`,
  //   `../builds/manifest.${tar_name}.yaml`
  // ].join(' '))
  const child = spawn('sed', [
    '-i',
    // '""',
    `s/^.*${name}=.*$/  - ${str}/`,
    `../builds/manifest.${tar_name}.yaml`
  ]);
  child.stdout.on('data', function(data) {
    // console.log(`stdout: ${data}`);
  });
  child.stderr.on('data', function(data){
    console.error(`stderr: ${data}`);
  });
};
