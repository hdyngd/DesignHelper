import { connect } from './connect'

import RegistUser from '../components/modules/admins/RegistUser'
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
})('admin-regist-user', RegistUser)