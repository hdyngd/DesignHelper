import { connect } from './connect'

import store from "../store";
import ProgressSteps from "../components/modules/utilities/ProgressSteps";
export default connect({
    gettersToProps: {
        // proposition: 'getProposition',
        me: 'getUser',
    },
    actionsToProps: {
        editProgress: 'editProgress',
    },
})('progress-steps', ProgressSteps)