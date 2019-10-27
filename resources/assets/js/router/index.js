import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '@/js/containers/Top'
import Home from '@/js/containers/Home'
import Login from '@/js/containers/Login'
import SignUp from '@/js/containers/signup'
import SetPassword from '@/js/containers/set_password'
import ResetPassword from '@/js/containers/reset_password'
import EmailVerification from '@/js/containers/email_verification'
import SignUpEmailVerification from '@/js/containers/signup_email_verification'
import Admin from '@/js/containers/Admin'
import DashBoard from '@/js/containers/dash_board'
import RegistUser from '@/js/containers/regist_user'
import AddCategory from '@/js/containers/add_category'
import AddMenu from '@/js/containers/add_menu'
import SendDm from '@/js/containers/send_dm'
import MyProposition from '@/js/containers/my_proposition'
import Proposition from '@/js/containers/proposition'
import Information from '@/js/containers/information'
import InformationDetail from '@/js/containers/information_detail'
import MenuStore from '@/js/containers/menu_store'
import Profile from '@/js/containers/profile'
import NotFound from '@/js/components/modules/utilities/NotFound'

import store from "@/js/store"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Top, beforeEnter: guest,
            children: [
                {path: 'category/:id', component: MenuStore},
            ]
        },
        { path: '/signup', component: SignUp, beforeEnter: guest},
        { path: '/login', component: Login, beforeEnter: guest},
        { path: '/verification/:token', component: SetPassword},
        { path: '/email_verification/:token', component: EmailVerification},
        { path: '/signup_email_verification/:token', component: SignUpEmailVerification},
        { path: '/reset_password', component: ResetPassword, beforeEnter: guest},
        { path: '/home', component: Home, beforeEnter: home,
            children: [
                {path: 'category/:id', component: MenuStore},
            ]
        },
        { path: '/profile', component: Profile, beforeEnter: auth},
        { path: '/propositions', component: MyProposition, beforeEnter: auth},
        { path: '/proposition/:id', component: Proposition, beforeEnter: auth},
        { path: '/information', component: Information, beforeEnter: auth},
        { path: '/information/:id', component: InformationDetail, beforeEnter: auth},
        { path: '/admin', component: Admin, beforeEnter: admin,
            children: [
                {path: 'dash_board', component: DashBoard},
                {path: 'regist_user', component: RegistUser},
                {path: 'add_category', component: AddCategory},
                {path: 'add_menu', component: AddMenu},
                {path: 'send_dm', component: SendDm},
            ]
        },
        { path: '/404', component: NotFound},
        { path: '*', redirect: '/404'},
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

function home(to, from, next) {
    // 認証ずみかどうか
    if (!store.getters.getToken) {
        // store.dispatch('setEntryUrl', to.path)
        next('/login')  // they are not authorized, so redirect to login
        return;
    }

    const user = store.getters.getUser;
    // 管理者なら管理画面へ
    if(user.role === 0) {
        next('/admin/dash_board')
        return;
    }

    //クリエイターなら案件管理画面へ
    if(user.role === 1) {
        next('/propositions')
        return;
    }

    //一般ユーザならhome画面へ
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