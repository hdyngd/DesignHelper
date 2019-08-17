import { connect } from './connect'

import store from "../store";
import EditMenu from "../components/modules/Edits/EditMenu";
export default connect({
    gettersToProps: {
        category: 'getCategories',
        menu: 'getEditMenu',
    },
    actionsToProps: {
        editMenu: 'editMenu',
        toggleDialogEditMenu: 'toggleDialogEditMenu',
    },
})('edit-menu', EditMenu)