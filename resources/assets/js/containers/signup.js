import { connect } from './connect'

import SignUp from '../components/pages/SignUp'

export default connect({
    actionsToProps: {
        signUp: 'signUp'
    },
})('signup', SignUp)