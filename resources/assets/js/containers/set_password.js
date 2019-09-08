import { connect } from './connect'

import SetPassword from '../components/pages/SetPassword'
import store from "../store";
export default connect({
    gettersToProps: {
        token: 'getEmailToken',
    },
    actionsToProps: {
        setPassword: 'setPassword'
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('setEmailToken', to.params.token)
                .then(() => {
                    next()
                }).catch(err => {
                    next('/')
            });
        }
    }
})('set-password', SetPassword)