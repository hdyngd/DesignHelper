import { connect } from './connect'

import store from "../store";
import ShoppingCart from "../components/modules/dialogs/ShoppingCart";
export default connect({
    gettersToProps: {
        shoppingCartVisible: 'getShoppingCartVisible',
        cart: 'getCart',
        amounts: 'getAmounts'
    },
    actionsToProps: {
        toggleShoppingCart: 'toggleShoppingCart',
        storeProposition: 'storeProposition',
        deleteItem: 'deleteItem',
        // logout: 'logout'
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        // beforeRouteEnter (to, from, next) {
        //     store.dispatch('fetchWorkRooms')
        //         .then(() => {
        //             next()
        //         }).catch(err => {
        //             next('/')
        //     });
        // }
    }
})('shopping-cart', ShoppingCart)