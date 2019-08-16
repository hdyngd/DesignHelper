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
                    dispatch('fetchUsers');
                    dispatch('flushSuccess', {title: 'Success', message: 'ユーザー情報を変更しました。'})
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
    fetchEditUser({commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/user/get/' + id,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_EDIT_USER', res)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
        })
    },
    toggleDialogEditUser({commit, dispatch}, bool) {
        commit('SET_DIALOG_EDIT_USER', bool)
    },
    deleteUser({commit, dispatch}, id){
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/user/delete/' + id,
                method: 'delete'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchUsers');
                    dispatch('flushSuccess', {title: 'Success', message: 'ユーザーを削除しました。'})
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