import { connect } from './connect'

import AddMenu from '../components/modules/admins/AddMenu'
import store from "../store";
export default connect({
    gettersToProps: {
        category: 'getCategories'
        // workRooms: 'getWorkRooms',
    },
    actionsToProps: {
        addMenu: 'addMenu'
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('fetchCategories')
                .then(() => {
                    next()
                }).catch(err => {
                    console.log(err);
                    // next('/')
            });
        }
    }
})('admin-add-menu', AddMenu)