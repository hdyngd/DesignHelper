import * as types from './mutation-types'

export const state = {
    categories: [],
    editCategory: {},
    dialogEditCategory: false,
}

export const mutations = {
    // [types.SET_CATEGORY] (state, payload) {
    //     state.category = payload
    // },
    [types.SET_CATEGORIES] (state, payload) {
        state.categories = payload
    },
    [types.SET_EDIT_CATEGORY] (state, payload) {
        state.editCategory = payload
        // state.refreshToken = payload.refreshToken
    },
    [types.SET_DIALOG_EDIT_CATEGORY] (state, payload) {
        state.dialogEditCategory = payload
        // state.refreshToken = payload.refreshToken
    },
}