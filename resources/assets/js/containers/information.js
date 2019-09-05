import { connect } from './connect'

import Information from "../components/pages/Information";
import store from "../store";
export default connect({
    gettersToProps: {
        informations: 'getInformations'
    },
    actionsToProps: {

    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('fetchInformations')
                .then(() => {
                    next()
                }).catch(err => {
                    console.log(err);
                    // next('/')
            });
        }
    }
})('information', Information)