import { connect } from './connect'

import store from "../store";
import ProfileEditForm from "../components/modules/Edits/ProfileEditForm";
export default connect({
    gettersToProps: {
        user: 'getUser'
    },
    actionsToProps: {
        editProfile: 'editProfile',
        toggleDialogEditUser: 'toggleDialogEditUser',
    },
    lifecycle: {
        // beforeRouteEnter (to, from, next) {
        //     // store.dispatch('fetchCategories')
        //     //     .then(() => {
        //             next()
        //     //     }).catch(err => {
        //     //         console.log(err);
        //     //         // next('/')
        //     // });
        // }
    }
})('profile-edit-form', ProfileEditForm)