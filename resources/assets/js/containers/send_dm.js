import { connect } from './connect'

import SendDm from '../components/modules/admins/SendDm'
import store from "../store";
export default connect({
    actionsToProps: {
        sendInformation: 'sendInformation',
        fileUpload: 'fileUpload'
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            next()
        }
    }
})('admin-send-dm', SendDm)