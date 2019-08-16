import * as types from './mutation-types'

export const state = {
    menus: [],
    category: [],
    editMenu: {},
    dialogEditMenu: false,
}

export const mutations = {
    [types.SET_MENUS] (state, payload) {
        state.menus = payload
    },
    [types.SET_CATEGORY] (state, payload) {
        state.category = payload
    },
    [types.SET_EDIT_MENU] (state, payload) {
        state.editMenu= payload
        // state.refreshToken = payload.refreshToken
    },
    [types.SET_DIALOG_EDIT_MENU] (state, payload) {
        state.dialogEditMenu= payload
        // state.refreshToken = payload.refreshToken
    },
}