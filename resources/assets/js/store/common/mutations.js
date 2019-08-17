import * as types from './mutation-types'

export const state = {
    loading: false,
    isHome: false,
}

export const mutations = {
    [types.SET_IS_LOADING] (state, payload) {
        state.loading = payload
        // state.refreshToken = payload.refreshToken
    },
    [types.SET_IS_HOME] (state, payload) {
        state.isHome = payload
        // state.refreshToken = payload.refreshToken
    },
}