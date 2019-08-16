import { connect } from './connect'

import DashBoard from '../components/modules/admins/DashBoard'
import store from "../store";
export default connect({
    gettersToProps: {
        users: 'getUsers',
        categories: 'getCategories',
        menus: 'getMenus',
        propositions: 'getPropositions',
        attachCreatorVisible: 'getAttachCreatorVisible',
        creators: 'getCreators',
        dialogEditUser: 'getDialogEditUser',
        dialogEditCategory: 'getDialogEditCategory',
    },
    actionsToProps: {
        toggleAttachCreator: 'toggleAttachCreator',
        attachCreator: 'attachCreator',
        fetchEditUser: 'fetchEditUser',
        toggleDialogEditUser: 'toggleDialogEditUser',
        deleteUser: 'deleteUser',
        fetchEditCategory: 'fetchEditCategory',
        toggleDialogEditCategory: 'toggleDialogEditCategory',
        deleteCategory: 'deleteCategory',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            let count = 0;
            store.dispatch('fetchUsers')
                .then(() => {

                    count++;
                    if(count === 5) {
                        next()
                    }
                }).catch(err => {
                console.log(err);
            });

            store.dispatch('fetchCategories')
                .then(() => {

                    count++;
                    if(count === 5) {
                        next()
                    }
                }).catch(err => {
                console.log(err);
            });

            store.dispatch('fetchMenus')
                .then(() => {

                    count++;
                    if(count === 5) {
                        next()
                    }
                }).catch(err => {
                console.log(err);
            });

            store.dispatch('fetchPropositions')
                .then(() => {

                    count++;
                    if(count === 5) {
                        next()
                    }
                }).catch(err => {
                console.log(err);
            });

            store.dispatch('fetchCreators')
                .then(() => {
                    count++;
                    if(count === 5) {
                        next()
                    }
                }).catch(err => {
                console.log(err);
            });
        }
    }
})('admin-dash-board', DashBoard)