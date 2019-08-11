import { connect } from './connect'

import Header from '../components/modules/menus/Header'
import store from "../store";
import ShoppingCart from "../components/modules/dialogs/ShoppingCart";
export default connect({
    gettersToProps: {
        shoppingCartVisible: 'getShoppingCartVisible',
        cart: 'getCart',
    },
    actionsToProps: {
        toggleShoppingCart: 'toggleShoppingCart',
        storeProposition: 'storeProposition',
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