import { connect } from './connect'

import InformationDetail from "../components/pages/InformationDetail";
import store from "../store";
export default connect({
    gettersToProps: {
        information: 'getEditInformation'
    },
    actionsToProps: {

    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('fetchEditInformation', to.params.id)
                .then(() => {
                    next()
                }).catch(err => {
                    console.log(err);
                    // next('/')
            });
        }
    }
})('information-detail', InformationDetail)