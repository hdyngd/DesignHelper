import { connect } from './connect'

import MenuStore from '../components/modules/homes/MenuStore'
import store from "../store";
export default connect({
    gettersToProps: {
        category: 'getCategory',
        menus: 'getMenus',
        isTop: 'getIsTop',
    },
    actionsToProps: {
        fetchMenu: 'fetchMenu',
        addToCart: 'addToCart',
        flushSuccess: 'flushSuccess',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('setIsHome', false)

            store.dispatch('fetchMenu', to.params.id)
                .then(() => {
                    next()
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
})('menu-store', MenuStore)