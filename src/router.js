import Vue from 'vue'
import Router from 'vue-router'

import UploadTask from './views/UploadTask';
import CandidateList from './views/CandidateList';
import UploadResToIPFS from './views/UploadResToIPFS';

// deploy data views
import UploadData from './deploy_data_views/UploadData';
import UploadCode from './deploy_data_views/UploadCode';
import DeployResult from './deploy_data_views/DeployResult';

// Errand views
import ErrandTask from './errand_views/ErrandTask';

// gov 
import NodeList from './gov/NodeList';
import RegisterNodeToLayer1 from './gov/RegisterNodeToLayer1';
import UpdateManifest from './gov/UpdateManifest';

Vue.use(Router);

import utils from './tea/utils';

const isErrandTask = utils.get_env('env') === 'dapp';
const isGov = utils.get_env('env') === 'gov';

let routers = [
  {
    path: '/',
    name: 'candidate_list',
    component: CandidateList
  },
  {
    path: '/upload_res',
    name: 'upload_res',
    component: UploadResToIPFS,
  },
  {
    path: '/upload_task',
    name: 'upload_task',
    component: UploadTask,
    meta: {

    }

  },
  {
    path: '/upload_data',
    name: 'upload_data',
    component: UploadData
  },
  {
    path: '/upload_code',
    name: 'upload_code',
    component: UploadCode
  },

  {
    path: '/deploy_result/:sesson_id',
    name: 'deploy_result',
    component: DeployResult
  }
  
];

if(isErrandTask){
  routers = [
    {
      path: '/',
      name: 'errand_task',
      component: ErrandTask
    }
  ];
}

if(isGov){
  routers = [
    {
      path: '/',
      name: 'node_list',
      component: NodeList,
    },
    {
      path: '/register_node',
      name: 'register_node',
      component: RegisterNodeToLayer1
    },
    {
      path: '/update/:tea_id',
      name: 'update_manifest',
      component: UpdateManifest
    }
  ];
}




export default new Router({
  routes: routers
})