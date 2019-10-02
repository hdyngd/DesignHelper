import * as types from './mutation-types'
import store from "../index";
export const actions = {
    fetchMenus ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/menu/get',
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    const displayNameList = {
                        0: '非表示',
                        1: '表示'
                    }
                    for (let key in res) {
                        res[key].displayName = displayNameList[res[key].display]
                    }
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
    fetchMenu ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/menu/get/' + data,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_CATEGORY', res.category)
                    resolve(res)
                }).catch((error) => {
                console.log(error);
                reject(error)
            })
        })
    },
    addMenu ({dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/menu/store',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    // console.log(res)
                    dispatch('flushSuccess', {title: 'Success', message: res.name + 'を追加しました。'})
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
    editMenu ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/menu/edit',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchMenus');
                    dispatch('flushSuccess', {title: 'Success', message: 'メニュー情報を変更しました。'})
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
    fetchEditMenu({commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/menu/getOne/' + id,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_EDIT_MENU', res)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    toggleDialogEditMenu({commit, dispatch}, bool) {
        commit('SET_DIALOG_EDIT_MENU', bool)
    },
    deleteMenu({commit, dispatch}, id){
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/menu/delete/' + id,
                method: 'delete'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchMenus');
                    dispatch('flushSuccess', {title: 'Success', message: 'メニューを削除しました。'})
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