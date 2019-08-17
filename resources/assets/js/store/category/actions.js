import * as types from './mutation-types'
import store from "../index";
export const actions = {
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
    // fetchCategory({dispatch, commit}) {
    //     return new Promise((resolve, reject) => {
    //         const payload = {
    //             url : '/api/category/get',
    //             method: 'get'
    //         }
    //         dispatch('api', payload)
    //             .then((res) => {
    //                 commit('SET_CATEGORY', res)
    //                 resolve(res)
    //             }).catch((error) => {
    //             for(let key in error) {
    //                 dispatch('flushError', {title: 'Error', message: error[key][0]})
    //             }
    //             // commit(SET_ERRORS, error)
    //             reject(error)
    //         })
    //     })
    // },
    addCategory ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/category/store',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
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
    editCategory ({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/category/edit',
                params: data,
                method: 'post'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchCategories');
                    dispatch('flushSuccess', {title: 'Success', message: 'カテゴリ情報を変更しました。'})
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
    fetchEditCategory({commit, dispatch}, id) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: '/api/category/get/' + id,
                method: 'get'
            }
            dispatch('api', payload)
                .then((res) => {
                    commit('SET_EDIT_CATEGORY', res)
                    resolve(res)
                }).catch((error) => {
                reject(error)
            })
        })
    },
    toggleDialogEditCategory({commit, dispatch}, bool) {
        commit('SET_DIALOG_EDIT_CATEGORY', bool)
    },
    deleteCategory({commit, dispatch}, id){
        return new Promise((resolve, reject) => {
            const payload = {
                url : '/api/category/delete/' + id,
                method: 'delete'
            }
            dispatch('api', payload)
                .then((res) => {
                    dispatch('fetchCategories');
                    dispatch('flushSuccess', {title: 'Success', message: 'カテゴリを削除しました。'})
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