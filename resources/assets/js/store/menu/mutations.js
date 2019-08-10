import * as types from './mutation-types'

export const state = {
    menus: [],
    category: [],
}

export const mutations = {
    [types.SET_MENUS] (state, payload) {
        state.menus = payload
    },
    [types.SET_CATEGORY] (state, payload) {
        state.category = payload
    },
}