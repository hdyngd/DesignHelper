import Vue from 'vue';
import VueRouter from 'vue-router';

// ログイン
import Login from './components/pages/Login'

//プロフィール
import User from './components/pages/User'

// topページ
import Home from './components/Home/Index'
import MenuList from './components/Home/MenuList'

// 案件一覧ページ
import Propositions from './components/pages/Propositions'

//　案件ページ
import Proposition from './components/pages/Proposition'

// 管理画面
import Admin from './components/Admin/Index'
import DashBoard from './components/Admin/DashBoard/DashBoard';
import RegistUser from "./components/Admin/RegistUser";
import AddCategory from "./components/Admin/AddCategory";
import AddMenu from "./components/Admin/AddMenu";

Vue.component('toolbar', require('./components/Toolbar.vue'));
Vue.component('user-list', require('./components/Admin/DashBoard/UserList.vue'));
Vue.component('category-list', require('./components/Admin/DashBoard/CategoryList.vue'));
Vue.component('shopping-cart', require('./components/ShoppingCart'));
Vue.component('menu-list', require('./components/Admin/DashBoard/MenuList.vue'));
Vue.component('proposition-list', require('./components/Admin/DashBoard/PropositionList.vue'));
Vue.component('regist-user', require('./components/Admin/RegistUser'));
Vue.component('description', require('./components/Home/Description'));
Vue.component('attach-designer', require('./components/Admin/DashBoard/AttachDesigner'));


Vue.use(VueRouter);

const routes = [
    { path: '/login', component: Login },
    { path: '/user', component: User, meta: { requiresAuth: true } },
    { path: '/home', component: Home, meta: { requiresAuth: true },
        children: [
            {path: 'category/:id', component: MenuList},
        ]
    },
    { path: '/propositions', component: Propositions, meta: { requiresAuth: true } },
    { path: '/proposition/:id', component: Proposition, meta: { requiresAuth: true } },
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