import * as types from './mutation-types'

export const state = {
    propositions: [],
    cart: [],
    shoppingCartVisible: false,
}

export const mutations = {
    [types.SET_PROPOSITIONS] (state, payload) {
        state.propositions = payload
    },
    // [types.PUSH_ITEM_TO_CART] (state, payload) {
    //     for (let key in state.cart) {
    //         if(state.cart[key].id === payload.id) return;
    //     }
    //     state.cart.push(payload)
    //     // state = Object.assign({}, state)
    // },
    [types.SET_CART] (state, payload) {
        state.cart = payload
        // state = Object.assign({}, state)
    },
    [types.SET_SHOPPING_CART_VISIBLE] (state, payload) {
        state.shoppingCartVisible = payload
    },
}