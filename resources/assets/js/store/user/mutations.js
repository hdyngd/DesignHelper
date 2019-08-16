import * as types from './mutation-types'

export const state = {
    users: [],
    editUser: {},
    dialogEditUser: false,
}

export const mutations = {
    [types.SET_USERS] (state, payload) {
        state.users = payload
        // state.refreshToken = payload.refreshToken
    },
    [types.SET_EDIT_USER] (state, payload) {
        state.editUser = payload
        // state.refreshToken = payload.refreshToken
    },
    [types.SET_DIALOG_EDIT_USER] (state, payload) {
        state.dialogEditUser = payload
        // state.refreshToken = payload.refreshToken
    },
}