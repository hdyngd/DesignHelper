import { connect } from './connect'

import Information from "../components/pages/Information";
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
})('information', Information)