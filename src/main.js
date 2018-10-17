// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import db from './db'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$db = db;


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (!to.meta.noLogin) {  // 判断该路由是否需要登录权限
        console.log(store.state.token)
        if (store.state.token || db.get('token')) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});
// router.afterEach((to) => {
//     window.scrollTo(0,0);
// });

// // http request 拦截器
axios.interceptors.request.use(
 
    config => {
        // store.dispatch('loadingShow', true);
        if(config.url.indexOf('http')!=-1){
        
            return config;
        }
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// // http response 拦截器
axios.interceptors.response.use(
    response => {
        // store.dispatch('loadingShow', false);
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status == 401) {
                //store.commit(types.LOGOUT);
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }else{
                store.commit('updateErrorMsg',error.response.data);
            }
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
