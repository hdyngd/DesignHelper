
// /**
//  * First we will load all of this project's JavaScript dependencies which
//  * includes Vue and other libraries. It is a great starting point when
//  * building robust, powerful web applications using Vue and Laravel.
//  */
//
// require('./bootstrap');
//
// window.Vue = require('vue');
//
// /**
//  * Next, we will create a fresh Vue application instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.
//  */
//
// Vue.component('example-component', require('./components/ExampleComponent.vue'));
//
// const app = new Vue({
//     el: '#app'
// });

require('./bootstrap')

import Vue from 'vue'

import router from './router';
window.router = router;

import store from './store';

Vue.use(store);
var token =  store.getters.getToken
if (token) {
    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'
locale.use(lang)

// import App from './App.vue';

Vue.use(ElementUI);

import Chat from 'vue-beautiful-chat'
Vue.use(Chat)

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// use
Vue.use(mavonEditor)

window.Moment = require('moment-timezone');

require('./components');

import Layout from "./containers/layout";

const app = new Vue({
    el: '#app',
    router,
    store,
    template: "<Layout/>",
    components: { Layout },
    render: h => h(Layout),
    props: [],
});