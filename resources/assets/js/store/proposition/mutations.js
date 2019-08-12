import * as types from './mutation-types'

export const state = {
    propositions: [],
    cart: [],
    shoppingCartVisible: false,
    attachCreatorVisible: false,
    creators: [],
    myPropositions: [],
}

export const mutations = {
    [types.SET_PROPOSITIONS] (state, payload) {
        state.propositions = payload
    },
    [types.SET_CART] (state, payload) {
        state.cart = payload
        // state = Object.assign({}, state)
    },
    [types.SET_SHOPPING_CART_VISIBLE] (state, payload) {
        state.shoppingCartVisible = payload
    },
    [types.SET_ATTACH_CREATOR_VISIBLE] (state, payload) {
        state.attachCreatorVisible = payload
    },
    [types.SET_CREATORS] (state, payload) {
        state.creators = payload
    },
    [types.SET_MY_PROPOSITIONS] (state, payload) {
        state.myPropositions = payload
    },
}