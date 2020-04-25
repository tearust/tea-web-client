import Vue from 'vue'
import Router from 'vue-router'

import UploadWasm from './views/UploadWasm';

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload_wasm',
      component: UploadWasm,
      meta: {

      }

    },
    
  ]
})