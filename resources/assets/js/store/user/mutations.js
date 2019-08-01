import * as types from './mutation-types'

export const state = {
    users: []
}

export const mutations = {
    [types.SET_USERS] (state, payload) {
        state.users = payload
        // state.refreshToken = payload.refreshToken
    },
}