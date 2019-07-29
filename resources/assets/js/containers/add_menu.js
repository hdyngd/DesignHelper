import { connect } from './connect'

import AddMenu from '../components/modules/admins/AddMenu'
import store from "../store";
export default connect({
    gettersToProps: {
        // workRooms: 'getWorkRooms',
    },
    actionsToProps: {
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
})('admin-add-menu', AddMenu)