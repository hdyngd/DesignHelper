import { connect } from './connect'

import store from "../store";
import MyProposition from "../components/pages/MyProposition";
export default connect({
    gettersToProps: {
        propositions: 'getMyPropositions',
        isChatOpen: 'getIsChatOpen',
    },
    actionsToProps: {
        chatToggle: 'chatToggle',
        fetchChat: 'fetchChat',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {

            store.dispatch('fetchMyPropositions')
                .then(() => {
                    next()
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
})('my-proposition', MyProposition)