import { connect } from './connect'

import AddMenu from '../components/modules/admins/AddMenu'
import store from "../store";
export default connect({
    gettersToProps: {
        category: 'getCategory'
        // workRooms: 'getWorkRooms',
    },
    actionsToProps: {
        addMenu: 'addMenu'
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('fetchCategory')
                .then(() => {
                    next()
                }).catch(err => {
                    console.log(err);
                    // next('/')
            });
        }
    }
})('admin-add-menu', AddMenu)