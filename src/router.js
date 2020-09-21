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

// layer1 portal
import RegisterTeaNode from './layer1_portal/RegisterTeaNode';

Vue.use(Router);

import utils from './tea/utils';

const isErrandTask = utils.get_env('env') === 'dapp';
const isLayer1 = utils.get_env('env') === 'layer1';

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

if(isLayer1){
  routers = [
    {
      path: '/',
      name: 'register_tea_node',
      component: RegisterTeaNode
    }
  ];
}




export default new Router({
  routes: routers
})