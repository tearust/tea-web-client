import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Loading } from 'element-ui';

import router from './router';
import './style.scss';

import http from './tea/http';
import utils from './tea/utils';

Vue.use(ElementUI);
Vue.config.productionTip = false;

const tmp = utils.cache.get('select-node');
tmp && tmp.http && utils.setHttpBaseUrl(tmp.http);

const {hex} = utils.crypto.get_secret();
console.log('crypto key => %s', hex);

// const crypto_str = utils.crypto.encode("hello world");
// console.log(111, crypto_str);
// const rr = utils.crypto.decode(crypto_str);
// console.log(222, rr);

const C = {};
new Vue({
  router,
  methods: {
    loading(f, text='Loading...'){
      if(f){
        C._loading = Loading.service({
          fullscreen: true,
          text,
          background: 'rgba(0, 0, 0, 0.7)',
          customClass: 'tea-loading'
        });
      }
      else{
        C._loading && C._loading.close();
      }
    }
  },
  render: h => h(App),
}).$mount('#app');
