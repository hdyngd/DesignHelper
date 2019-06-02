import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import User from './components/pages/User'
import Admin from './components/Admin/Index'
import RegistUser from "./components/Admin/RegistUser";

Vue.component('navbar', require('./components/Layouts/Navbar.vue'))
Vue.component('admin-side-menu', require('./components/Admin/SideMenu'))
Vue.component('regist-user', require('./components/Admin/RegistUser'))

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/user', component: User, meta: { requiresAuth: true } },
    { path: '/admin', component: Admin, meta: { requiresAuth: true },
        children: [
            {
                path: 'regist_user', component: RegistUser,
            }
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (state.isLogin === false) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next();
    }
});

export default router;