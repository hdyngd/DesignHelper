import * as types from './mutation-types'

export const state = {
    propositions: [],
    proposition: {},
    cart: [],
    amounts: [],
    shoppingCartVisible: false,
    attachCreatorVisible: false,
    creators: [],
    myPropositions: [],
    participants: [],
    messageList: [],
    creditToken: '',
}

export const mutations = {
    [types.SET_PROPOSITIONS] (state, payload) {
        state.propositions = payload
    },
    [types.SET_PROPOSITION] (state, payload) {
        state.proposition = payload
    },
    [types.SET_CART] (state, payload) {
        state.cart = payload
        // state = Object.assign({}, state)
    },
    [types.SET_AMOUNTS] (state, payload) {
        state.amounts = payload
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
    [types.SET_PARTICIPANTS] (state, payload) {
        state.participants = payload
    },
    [types.SET_MESSAGE_LIST] (state, payload) {
        state.messageList = payload
    },
    [types.SET_CREDIT_TOKEN] (state, payload) {
        state.creditToken = payload
    },
}