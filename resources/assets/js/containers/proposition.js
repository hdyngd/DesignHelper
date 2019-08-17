import { connect } from './connect'

import store from "../store";
import Proposition from "../components/pages/Proposition";
export default connect({
    gettersToProps: {
        proposition: 'getProposition'
    },
    actionsToProps: {

    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            let max = 3;
            let count = 0;

            store.dispatch('fetchParticipants', to.params.id)
                .then(() => {
                    count++;
                    if(count === max) {
                        next()
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            store.dispatch('fetchMessageList', to.params.id)
                .then(() => {
                    count++;
                    if(count === max) {
                        next()
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            store.dispatch('fetchProposition', to.params.id)
                .then(() => {
                    count++;
                    if(count === max) {
                        next()
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
})('proposition', Proposition)