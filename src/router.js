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

Vue.use(Router);

import utils from './tea/utils';

const isErrandTask = utils.get_env('env') === 'dapp';

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




export default new Router({
  routes: routers
})