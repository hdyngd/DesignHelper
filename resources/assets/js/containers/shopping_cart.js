import { connect } from './connect'

import store from "../store";
import ShoppingCart from "../components/modules/dialogs/ShoppingCart";
export default connect({
    gettersToProps: {
        shoppingCartVisible: 'getShoppingCartVisible',
        cart: 'getCart',
        amounts: 'getAmounts',
        creditToken: 'getCreditToken'
    },
    actionsToProps: {
        toggleShoppingCart: 'toggleShoppingCart',
        storeProposition: 'storeProposition',
        deleteItem: 'deleteItem',
        saveShoppingCart: 'saveShoppingCart',
    },
})('shopping-cart', ShoppingCart)