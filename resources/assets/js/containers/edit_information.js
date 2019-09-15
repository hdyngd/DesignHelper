import { connect } from './connect'

import store from "../store";
import EditInformation from "../components/modules/Edits/EditInformation";
export default connect({
    gettersToProps: {
        information: 'getEditInformation',
    },
    actionsToProps: {
        editInformation: 'editInformation',
        toggleDialogEditInformation: 'toggleDialogEditInformation',
        fileUpload: 'fileUpload',
    },
})('edit-information', EditInformation)