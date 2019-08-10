import { connect } from './connect'

import Header from '../components/modules/menus/Header'
import store from "../store";
export default connect({
    gettersToProps: {
        user: 'getUser',
        cart: 'getCart',
    },
    actionsToProps: {
        logout: 'logout'
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
})('dh-header', Header)