import { connect } from './connect'

import store from "../store";
import Profile from "../components/pages/Profile";
export default connect({
    gettersToProps: {
        user: 'getUser'
    },
    actionsToProps: {
    },
    lifecycle: {
        // beforeRouteEnter (to, from, next) {
        //     // store.dispatch('fetchCategories')
        //     //     .then(() => {
        //             next()
        //     //     }).catch(err => {
        //     //         console.log(err);
        //     //         // next('/')
        //     // });
        // }
    }
})('profile', Profile)