import { connect } from './connect'

import EmailVerification from '../components/pages/EmailVerification'
import store from "../store";
export default connect({
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            store.dispatch('signUpEmailVerify', to.params.token)
        }
}
})('email-verification', EmailVerification)