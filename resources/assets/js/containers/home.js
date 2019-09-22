import { connect } from './connect'

import Home from '../components/pages/Home'
import store from "../store";
export default connect({
    gettersToProps: {
        categories: 'getCategories',
        isHome: 'getIsHome',
    },
    actionsToProps: {
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            if(to.query.tkn) console.log(to.query.tkn);

            store.dispatch('setIsHome', true)

            store.dispatch('fetchCategories')
                .then(() => {
                    next()
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
})('home-component', Home)