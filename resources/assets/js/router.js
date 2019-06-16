import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import User from './components/pages/User'
import Admin from './components/Admin/Index'
import DashBoard from './components/Admin/DashBoard/DashBoard';
import RegistUser from "./components/Admin/RegistUser";
import AddCategory from "./components/Admin/AddCategory";
import AddMenu from "./components/Admin/AddMenu";

Vue.component('user-list', require('./components/Admin/DashBoard/UserList.vue'));
Vue.component('category-list', require('./components/Admin/DashBoard/CategoryList.vue'));
Vue.component('menu-list', require('./components/Admin/DashBoard/MenuList.vue'));
Vue.component('proposition-list', require('./components/Admin/DashBoard/PropositionList.vue'));
Vue.component('regist-user', require('./components/Admin/RegistUser'))

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/user', component: User, meta: { requiresAuth: true } },
    { path: '/admin', component: Admin, meta: { requiresAuth: true },
        children: [
            {path: 'dash_board', component: DashBoard},
            {path: 'dash_board/user', component: DashBoard,},
            {path: 'dash_board/category', component: DashBoard,},
            {path: 'dash_board/menu', component: DashBoard,},
            {path: 'dash_board/proposition', component: DashBoard,},
            {path: 'regist_user', component: RegistUser},
            {path: 'add_category', component: AddCategory},
            {path: 'add_menu', component: AddMenu},
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