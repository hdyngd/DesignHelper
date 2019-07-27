import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/js/containers/Home'
import Login from '@/js/containers/Login'
// import Top from '@/js/components/pages/Top' // TODO
import store from "@/js/store"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home, beforeEnter: auth},
        { path: '/home', component: Home, beforeEnter: auth},
        { path: '/login', component: Login, beforeEnter: guest},
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

export default router