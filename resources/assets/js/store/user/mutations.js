import * as types from './mutation-types'

export const state = {
    users: [],
    categories: [],
    menus: [],
    propositions: [],
}

export const mutations = {
    [types.SET_USERS] (state, payload) {
        state.users = payload
        // state.refreshToken = payload.refreshToken
    },
    [types.SET_CATEGORIES] (state, payload) {
        state.categories = payload
    },
    [types.SET_MENUS] (state, payload) {
        state.menus = payload
    },
    [types.SET_PROPOSITIONS] (state, payload) {
        state.propositions = payload
    },
}