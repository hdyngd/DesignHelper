import { connect } from './connect'

import store from "../store";
import EditCategory from "../components/modules/Edits/EditCategory";
export default connect({
    gettersToProps: {
        category: 'getEditCategory',
    },
    actionsToProps: {
        editCategory: 'editCategory',
        toggleDialogEditCategory: 'toggleDialogEditCategory',
    },
})('edit-category', EditCategory)