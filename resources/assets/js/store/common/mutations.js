import * as types from './mutation-types'

export const state = {
    loading: false,
    isHome: false,
    informations: [],
    dialogEditInformation: false,
    editInformation: {},
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
    [types.SET_INFORMATIONS] (state, payload) {
        state.informations = payload
    },
    [types.SET_DIALOG_EDIT_INFORMATION] (state, payload) {
        state.dialogEditInformation = payload
        // state.refreshToken = Capayload.refreshToken
    },
    [types.SET_EDIT_INFORMATION] (state, payload) {
        state.editInformation = payload
        // state.refreshToken = payload.refreshToken
    },
}