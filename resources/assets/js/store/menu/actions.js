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
}