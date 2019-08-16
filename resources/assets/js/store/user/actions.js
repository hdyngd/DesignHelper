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
    editProfile ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/edit',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchMe');
                    dispatch('flushSuccess', {title: 'Success', message: 'プロフィール情報を変更しました。'})
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

}