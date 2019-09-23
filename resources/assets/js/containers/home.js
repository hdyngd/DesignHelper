import { connect } from './connect'

import Home from '../components/pages/Home'
import store from "../store";
export default connect({
    gettersToProps: {
        categories: 'getCategories',
        isHome: 'getIsHome',
    },
    actionsToProps: {
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            if(to.query.tkn) {
                store.dispatch('restoreShoppingCart', to.query.tkn)
                history.replaceState('','','/home');
                store.dispatch('toggleShoppingCart', true)
                store.dispatch('flushSuccess', {title: 'Success', message: 'クレジットカード情報が入力されました。'})
            }

            store.dispatch('setIsHome', true)

            store.dispatch('fetchCategories')
                .then(() => {
                    next()
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
})('home-component', Home)