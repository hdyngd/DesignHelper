import { connect } from './connect'

import ResetPassword from '../components/pages/ResetPassword'
import store from "../store";
export default connect({
    actionsToProps: {
        resetPassword: 'resetPassword'
    }
})('reset-password', ResetPassword)