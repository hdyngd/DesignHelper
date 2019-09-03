import { connect } from './connect'

import SendDm from '../components/modules/admins/SendDm'
import store from "../store";
export default connect({
    gettersToProps: {
        // category: 'getCategories'
        // workRooms: 'getWorkRooms',
    },
    actionsToProps: {
        // addMenu: 'addMenu'
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            next()
            // store.dispatch('fetchCategories')
            //     .then(() => {
            //         next()
            //     }).catch(err => {
            //         console.log(err);
            //         // next('/')
            // });
        }
    }
})('admin-send-dm', SendDm)