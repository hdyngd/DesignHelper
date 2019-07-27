import * as types from './mutation-types'

export const state = {
    loading: false
}

export const mutations = {
    [types.SET_IS_LOADING] (state, payload) {
        state.loading = payload
        // state.refreshToken = payload.refreshToken
    },
}