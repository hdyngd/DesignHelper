import { connect } from './connect'

import DashBoard from '../components/modules/admins/DashBoard'
import store from "../store";
export default connect({
    gettersToProps: {
        users: 'getUsers'
        // workRooms: 'getWorkRooms',
    },
    actionsToProps: {
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('fetchUsers')
                .then(() => {
                    next()
                }).catch(err => {
                next('/')
            });
        }
    }
})('admin-dash-board', DashBoard)