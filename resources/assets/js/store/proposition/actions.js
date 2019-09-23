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
    fetchProposition ({commit, dispatch}, propositionId) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/proposition/get/' + propositionId,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {

                    commit('SET_PROPOSITION', res)
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

        let tmpAmounts = state.amounts
        item.amount = 1;
        tmp.push(item)
        tmpAmounts.push(1);
        commit('SET_CART', tmp)
        commit('SET_AMOUNTS', tmpAmounts)
        dispatch('flushSuccess', {title: 'Success', message: 'カートに追加しました'})
    },
    deleteItem({commit, state}, index){
        let tmpCart = state.cart;
        let tmpAmounts = state.amounts;

        tmpCart.splice(index, 1);
        tmpAmounts.splice(index, 1);

        commit('SET_CART', tmpCart)
        commit('SET_AMOUNTS', tmpAmounts)
    },
    toggleShoppingCart({commit, dispatch}, bool) {
        commit('SET_SHOPPING_CART_VISIBLE', bool)
    },
    toggleAttachCreator({commit, dispatch}, bool) {
        commit('SET_ATTACH_CREATOR_VISIBLE', bool)
    },
    saveShoppingCart({getters}) {
        return new Promise((resolve) => {
            const cart = getters.getCart;
            const amounts = getters.getAmounts;
            window.localStorage.setItem('cart', JSON.stringify(cart))
            window.localStorage.setItem('amounts', JSON.stringify(amounts))
            resolve()
        })
    },
    restoreShoppingCart({commit}, token) {
        commit('SET_CART', JSON.parse(window.localStorage.getItem('cart')))
        commit('SET_AMOUNTS', JSON.parse(window.localStorage.getItem('amounts')))
        localStorage.removeItem('cart');
        localStorage.removeItem('amounts');
        commit('SET_CREDIT_TOKEN', token)
    },
    storeProposition({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {

            dispatch('payment', data)
                .then((rt) => {
                    const payload = {
                        url : '/api/proposition/store',
                        params: {data: data},
                        method: 'post'
                    }
                    dispatch('api', payload)
                        .then((res) => {
                            // console.log(res)
                            commit('SET_CART', [])
                            commit('SET_AMOUNTS', [])
                            dispatch('flushSuccess', {title: 'Success', message: '発注しました。'})

                            resolve(res)
                        }).catch((error) => {
                        for(let key in error) {
                            dispatch('flushError', {title: 'Error', message: error[key][0]})
                        }
                        // commit(SET_ERRORS, error)
                        reject(error)
                    })
                }).catch((error) => {
                    dispatch('flushError', {title: 'Error', message: "クレジットカード決済に失敗しました。クレジットカード情報を再入力してください。"})
                    commit('SET_CREDIT_TOKEN', "")
                    reject(error)
                })
        })
    },
     // credit payment
    payment({dispatch, getters}, data){
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/proposition/payment',
                params: {data: data, token: getters.getCreditToken},
                method: 'post',
            }
            dispatch('api', payload)
                .then((res) => {
                    if (res == "OK") {
                        resolve(res)
                    }else {
                        reject(res)
                    }
                }).catch((error) => {
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

                    commit('SET_MY_PROPOSITIONS', res)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    fetchParticipants({commit, dispatch}, propositionId) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/propositionUsers/get/' + propositionId,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {

                    let user = [];
                    res.forEach((item) => {
                        user.push({
                            id: item.id,
                            name: item.name,
                            imageUrl: (item.thumbnail) ? item.thumbnail : 'https://design-helper.s3-ap-northeast-1.amazonaws.com/profile/profile_default.png'
                        })
                    })
                    // console.log(user);
                    commit('SET_PARTICIPANTS', user)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })

    },
    fetchMessageList({commit, dispatch}, propositionId) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/messages/get/' + propositionId,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {

                    let contents = [];
                    res.forEach((item) => {
                        if(item.type === 'text') {
                            contents.push({
                                type: item.type,
                                author: item.author,
                                data: {text: item.content}
                            })
                        } else if(item.type === 'emoji') {
                            contents.push({
                                type: item.type,
                                author: item.author,
                                data: {emoji: item.content}
                            })
                        } else {
                        //    file
                            contents.push({
                                type: item.type,
                                author: item.author,
                                data: {
                                    file: {
                                        name: item.content,
                                        url: item.url
                                    }
                                }
                            })
                        }
                    })
                    // console.log(contents);
                    commit('SET_MESSAGE_LIST', contents)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    addMessage({commit, dispatch, state}, data) {
        let tmp = state.messageList;
        tmp.push(data)
        commit('SET_MESSAGE_LIST', tmp)
    },
    storeMessage({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/message/store',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    resolve(res)
                }).catch((error) => {
                    commit(SET_ERRORS, error)
                    reject(error)
            })
        })
    },
    editProgress({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/proposition/edit/progress',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('flushSuccess', {title: 'Success', message: '進捗状況を更新しました。'})
                    resolve(res)
                }).catch((error) => {
                for(let key in error) {
                    dispatch('flushError', {title: 'Error', message: error[key][0]})
                }
                // commit(SET_ERRORS, error)
                reject(error)
            })
        })
    }
}