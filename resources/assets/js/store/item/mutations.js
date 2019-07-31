import * as types from './mutation-types'

export const state = {
    category: []
}

export const mutations = {
    [types.SET_CATEGORY] (state, payload) {
        state.category = payload
    },
}