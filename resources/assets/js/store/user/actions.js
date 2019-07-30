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
                    // console.log(res)
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
}