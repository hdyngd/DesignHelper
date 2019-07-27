import { connect } from './connect'

import Login from '../components/pages/Login'
import store from "../store";
export default connect({
    gettersToProps: {
        // workRooms: 'getWorkRooms',
    },
    actionsToProps: {
        login: 'login'
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
})('login-component', Login)