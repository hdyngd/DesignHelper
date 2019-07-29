import { connect } from './connect'

import AddCategory from '../components/modules/admins/AddCategory'
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
})('admin-add-category', AddCategory)