import { connect } from './connect'

import Home from '../components/pages/Home'
import store from "../store";
export default connect({
    gettersToProps: {
        categories: 'getCategories',
        isHome: 'getIsHome',
        isTop: 'getIsTop',
    },
    actionsToProps: {
        // deleteWorkRoom: 'deleteWorkRoom',
        // createWorkRoom: 'createWorkRoom',
    },
    lifecycle: {
        beforeRouteEnter (to, from, next) {
            if(to.query.tkn) {
                store.dispatch('restoreShoppingCart', to.query.tkn)
                store.dispatch('toggleShoppingCart', true)
                store.dispatch('flushSuccess', {title: 'Success', message: 'クレジットカード情報が入力されました。'})
            }

            store.dispatch('setIsHome', true)

            // Topページフラグをオフに。カートへ追加ボタンをアクティブ化
            store.dispatch('setIsTop', false)

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