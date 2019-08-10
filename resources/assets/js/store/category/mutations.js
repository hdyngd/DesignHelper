import * as types from './mutation-types'

export const state = {
    // category: [],
    categories: [],
}

export const mutations = {
    // [types.SET_CATEGORY] (state, payload) {
    //     state.category = payload
    // },
    [types.SET_CATEGORIES] (state, payload) {
        state.categories = payload
    },
}