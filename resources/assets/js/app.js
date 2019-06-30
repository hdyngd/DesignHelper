require('./bootstrap')


import Vue from 'vue';
window.Bus = new Vue();

import store from './store';
import router from './router';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import mutation from './mutation'
Vue.mixin(mutation);

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
    iconPack : 'material'
})

let errorOptions = {
    type : 'error',
    icon : 'error_outline',
    duration : 5000
};

// register the toast with the custom message
Vue.toasted.register('error',
    (payload) => {

        // if there is no message passed show default message
        if(! payload.message) {
            return "Oops.. Something Went Wrong.."
        }

        // if there is a message show it with the message
        return "Oops.. " + payload.message;
    },
    errorOptions
)

let addCartOptions = {
    message : 'カートに追加しました',
    type : 'info',
    icon : 'add_shopping_cart',
    duration : 5000
};
// register the toast with the custom message
Vue.toasted.register('addCart',
    () => {
        return "カートに追加しました";
    },
    addCartOptions
)

let execOrderOptions = {
    type : 'info',
    icon : 'info',
    duration : 5000
};
// register the toast with the custom message
Vue.toasted.register('execOrder',
    () => {
        return "発注しました";
    },
    execOrderOptions
)

window.state = store.state;

Vue.component('app', require('./components/App.vue'));

const app = new Vue({
    router
}).$mount('#app');