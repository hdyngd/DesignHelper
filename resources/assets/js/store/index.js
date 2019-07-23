import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/js/store/auth'
import user from '@/js/store/user'
import common from '@/js/store/common'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        user,
        common,
    }
})