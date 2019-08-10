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

}