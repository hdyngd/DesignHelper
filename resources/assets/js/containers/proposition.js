import { connect } from './connect'

import store from "../store";
import Proposition from "../components/pages/Proposition";
export default connect({
    gettersToProps: {

    },
    actionsToProps: {

    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {

            // store.dispatch('fetchMyPropositions')
            //     .then(() => {
                    next()
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        }
    },
})('proposition', Proposition)