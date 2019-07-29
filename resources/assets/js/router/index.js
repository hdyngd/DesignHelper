import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/js/containers/Home'
import Login from '@/js/containers/Login'
import Admin from '@/js/containers/Admin'
import DashBoard from '@/js/containers/dash_board'
import RegistUser from '@/js/containers/regist_user'
import AddCategory from '@/js/containers/add_category'
import AddMenu from '@/js/containers/add_menu'

import store from "@/js/store"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home, beforeEnter: auth},
        { path: '/login', component: Login, beforeEnter: guest},
        { path: '/home', component: Home, beforeEnter: auth},
        { path: '/admin', component: Admin, beforeEnter: admin,
            children: [
                {path: 'dash_board', component: DashBoard},
                {path: 'regist_user', component: RegistUser},
                {path: 'add_category', component: AddCategory},
                {path: 'add_menu', component: AddMenu},
            ]
        },
        // { path: '/signup', component: Signup, beforeEnter: guest},
        // { path: '/login', component: Login, beforeEnter: guest},
        // { path: '/participated', component: Participated, beforeEnter: permanent, auth},
        // { path: '/user_list/:workroom', component: UserList, beforeEnter: permanent, auth},
        // { path: '/enter/:workroom', component: Enter, beforeEnter: enter},
        // { path: '/escalation', component: Escalation, beforeEnter: escalation},
        // { path: '/:workroom', component: WorkRoom},
    ]
})

router.beforeEach((to, from, next) => {
    // // ワークルームか否かのフラグ
    // // Pagesの定義元は /config/reserved_url.php
    // let isWorkroom = !Pages.includes(to.path.split('/')[1]);
    // if(to.path === "/") isWorkroom = false;
    //
    // store.dispatch('flushMessage')
    // store.dispatch('setIsWorkRoom', isWorkroom)
    next()
})

function auth(to, from, next) {
    if (!store.getters.getToken) {
        // store.dispatch('setEntryUrl', to.path)
        next('/login')  // they are not authorized, so redirect to login
    }

    next()
}

function guest(to, from, next) {
    if (store.getters.getToken) {
        next('/home')
    }

    next()
}

function admin(to, from, next) {

    if (!store.getters.getToken) next('/login')

    const user = store.getters.getUser
    if (user.role !== 0) {
        next('/home')
    }

    next()
}

export default router