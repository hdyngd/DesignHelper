import { connect } from './connect'

import Home from '../components/pages/Home'
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
})('home-component', Home)