import * as types from './mutation-types'
import store from "../index";
export const actions = {
    fetchPropositions ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/proposition/getAll',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    const progressName = {
                        0: "未着手",
                        1: "着手",
                        2: "作業中",
                        3: "クライアント確認",
                        4: "最終調整",
                        5: "納品済"
                    }

                    for (let key in res) {
                        res[key].progressName = progressName[res[key].progress]
                    }

                    commit('SET_PROPOSITIONS', res)
                    resolve(res)
                }).catch((error) => {
                // for(let key in error) {
                //     dispatch('flushError', {title: 'Error', message: error[key][0]})
                // }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    addToCart({commit, dispatch}, item) {
        commit('PUSH_ITEM_TO_CART', item)
        dispatch('flushSuccess', {title: 'Success', message: 'カートに追加しました'})
    }
}