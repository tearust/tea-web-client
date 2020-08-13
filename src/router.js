import Vue from 'vue'
import Router from 'vue-router'

import UploadTask from './views/UploadTask';
import CandidateList from './views/CandidateList';
import UploadResToIPFS from './views/UploadResToIPFS';

// deploy data views
import UploadData from './deploy_data_views/UploadData';

Vue.use(Router)


export default new Router({
  routes: [
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
    
  ]
})