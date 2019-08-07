import { connect } from './connect'

import DashBoard from '../components/modules/admins/DashBoard'
import store from "../store";
export default connect({
    gettersToProps: {
        users: 'getUsers',
        categories: 'getCategories',
        menus: 'getMenus',
        propositions: 'getPropositions'
    },
    actionsToProps: {
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            let count = 0;
            store.dispatch('fetchUsers')
                .then(() => {

                    count++;
                    if(count === 4) {
                        next()
                    }
                }).catch(err => {
                next('/')
            });

            store.dispatch('fetchCategories')
                .then(() => {

                    count++;
                    if(count === 4) {
                        next()
                    }
                }).catch(err => {
                next('/')
            });

            store.dispatch('fetchMenus')
                .then(() => {

                    count++;
                    if(count === 4) {
                        next()
                    }
                }).catch(err => {
                next('/')
            });

            store.dispatch('fetchPropositions')
                .then(() => {

                    count++;
                    if(count === 4) {
                        next()
                    }
                }).catch(err => {
                next('/')
            });
        }
    }
})('admin-dash-board', DashBoard)