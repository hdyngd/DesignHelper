import * as types from './mutation-types'
import store from "../index";
export const actions = {
    createUser ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/store',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    alert('password: ' + res.password);
                    dispatch('flushSuccess', {title: 'Success', message: res.name + ' 様の登録が完了しました。'})
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
    fetchUsers ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/get',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    const roleNameList = {
                        0: '管理者',
                        1: 'クリエイター',
                        2: '一般ユーザー'
                    }

                    for (let key in res) {
                        res[key].roleName = roleNameList[res[key].role]
                    }
                    commit('SET_USERS', res)
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
    fetchCategories ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/category/get',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_CATEGORIES', res)
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
    fetchMenus ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/menu/get',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_MENUS', res)
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
}