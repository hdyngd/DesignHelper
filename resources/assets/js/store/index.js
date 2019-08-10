import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/js/store/auth'
import user from '@/js/store/user'
import common from '@/js/store/common'
import category from '@/js/store/category'
import menu from '@/js/store/menu'
import proposition from '@/js/store/proposition'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        user,
        common,
        category,
        menu,
        proposition,
    }
})