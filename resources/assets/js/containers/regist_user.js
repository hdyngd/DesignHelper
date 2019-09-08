import { connect } from './connect'

import RegistUser from '../components/modules/admins/RegistUser'

export default connect({
    actionsToProps: {
        createUser: 'createUser'
    },
})('admin-regist-user', RegistUser)