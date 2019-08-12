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
    addToCart({commit, dispatch, state}, item) {
        let tmp = state.cart
        for (let key in tmp) {
            if(tmp[key].id === item.id) return;
        }

        item.amount = 1;
        tmp.push(item)
        commit('SET_CART', tmp)
        dispatch('flushSuccess', {title: 'Success', message: 'カートに追加しました'})
    },
    toggleShoppingCart({commit, dispatch}, bool) {
        commit('SET_SHOPPING_CART_VISIBLE', bool)
    },
    toggleAttachCreator({commit, dispatch}, bool) {
        commit('SET_ATTACH_CREATOR_VISIBLE', bool)
    },
    storeProposition({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/proposition/store',
                params: {data: data},
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    // console.log(res)
                    commit('SET_CART', [])
                    dispatch('flushSuccess', {title: 'Success', message: '発注しました。'})

                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    fetchCreators ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/getCreator',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    // console.log(res);
                    commit('SET_CREATORS', res)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    attachCreator({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/proposition/attachCreator',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('flushSuccess', {title: 'Success', message: '担当クリエイターを決定しました。'})
                    dispatch('fetchPropositions')
                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    },
    fetchMyPropositions({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/proposition/get',
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

                    commit('SET_MY_PROPOSITIONS', res)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    }
}