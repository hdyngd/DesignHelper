import { connect } from './connect'

import MenuStore from '../components/modules/homes/MenuStore'
import store from "../store";
export default connect({
    gettersToProps: {
        // shopMenu: 'getShopMenu',
    },
    actionsToProps: {
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            next()
            // store.dispatch('fetchShopMenu')
            //     .then(() => {
            //         next()
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    }
})('menu-store', MenuStore)